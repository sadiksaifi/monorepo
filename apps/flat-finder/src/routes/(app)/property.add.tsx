import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTRPC } from '@/lib/trpc-client'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { TRPCClientError } from '@trpc/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PropertyMediaUpload } from '@/components/property-media-upload'
import { ScreenLoader } from '@/components/screen-loader'
import { HeaderBackButton, useHeader } from '@/hooks/use-header'
import { useMemo, useState } from 'react'
import { Settings2 } from 'lucide-react'

export const Route = createFileRoute('/(app)/property/add')({
  component: RouteComponent,
})

export const formInputSchema = z.object({
  propertyName: z.string().nonempty({ message: 'Property name is required' }),
  ownerName: z.string().optional(),
  ownerPhone: z.string().min(10, { message: 'Not a valid phone number' }).max(10, {
    message: 'Not a valid phone number',
  }),
  ownerType: z.string().nonempty({ message: 'Required' }),
  rentAmount: z.string().nonempty({ message: 'Rent amount is required' }),
  depositAmount: z.string().nonempty({ message: 'Deposit amount is required' }),
  brokerageFee: z.string().optional(),
  location: z.string().nonempty({ message: 'Location is required' }),
  mapsLocationLink: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  imageURL: z.array(z.string()).optional().default([]),
})

export const formSchema = formInputSchema.transform((data) => ({
  ...data,
  rentAmount: Number(data.rentAmount),
  depositAmount: Number(data.depositAmount),
  brokerageFee: data.brokerageFee ? Number(data.brokerageFee) : undefined,
}))

function RouteComponent() {
  const trpc = useTRPC()
  const headerContent = useMemo(
    () => ({
      left: <HeaderBackButton />,
      center: (
        <Button variant="ghost" asChild>
          <Link to="/">Flat Finder</Link>
        </Button>
      ),
      right: import.meta.env.DEV ? (
        <Button
          variant="ghost"
          className="h-full aspect-square"
          onClick={() => {
            form.reset(seedValues)
            toast.success('Fake form values has been seeded!')
          }}
        >
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <></>
      ),
    }),
    [],
  )

  useHeader(headerContent)

  const form = useForm<z.input<typeof formInputSchema>>({
    resolver: zodResolver(formInputSchema),
    defaultValues: {
      propertyName: '',
      ownerName: '',
      ownerPhone: '',
      ownerType: '',
      rentAmount: '',
      depositAmount: '',
      brokerageFee: '',
      location: '',
      mapsLocationLink: '',
      address: '',
      description: '',
    },
  })
  const [isUploading, setIsUploading] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const { isPending, mutate } = useMutation(
    trpc.flat.add.mutationOptions({
      onError: (error) => {
        console.error(error)
        if (error instanceof TRPCClientError) {
          if (error.message.includes('Authentication required!')) {
            toast.error('You need to sign in to add a flat', {
              action: (
                <Button
                  className="ml-auto"
                  onClick={() => router.navigate({ to: '/login' })}
                >
                  Sign in
                </Button>
              ),
            })
            return
          }
          toast.error('Please fill all the required fields correctly!')
        } else {
          toast.error('Something went wrong!')
        }
      },
      onSuccess: (data) => {
        console.log(data)
        queryClient.invalidateQueries({
          queryKey: [trpc.flat.getAll.queryKey()],
        })
        toast.success('Property added successfully')
        router.navigate({
          to: '/property/$id',
          params: {
            id: data,
          },
        })
      },
    }),
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data)
          const transformedData = formSchema.parse(data)
          // @ts-ignore
          mutate(transformedData)
        })}
        className="p-4 mt-18"
      >
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">Add Property</h1>
            <p className="text-muted-foreground">
              Please fill all the required fields correctly!
            </p>
          </div>
          <FormField
            control={form.control}
            name="propertyName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Property Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Owner/Broker Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ownerType"
              render={({ field, fieldState }) => (
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <ToggleGroup
                      className={cn(fieldState.invalid && 'border-destructive border')}
                      type="single"
                      variant="outline"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <ToggleGroupItem value="bold" aria-label="Toggle owner">
                        Owner
                      </ToggleGroupItem>
                      <ToggleGroupItem value="italic" aria-label="Toggle broker">
                        Broker
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <FormMessage />
                  </div>
                </FormControl>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="ownerPhone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Phone Number" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Rent Amount" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depositAmount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Deposit Amount" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="brokerageFee"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Brokerage Fee (if any)" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="mapsLocationLink"
              render={({ field }) => (
                <FormItem className="w-[90%]">
                  <FormControl>
                    <Input placeholder="Maps Location Link" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="">
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BTM Layout">BTM Layout</SelectItem>
                      <SelectItem value="Bellandur">Bellandur</SelectItem>
                      <SelectItem value="HSR Layout">HSR Layout</SelectItem>
                      <SelectItem value="Koramangala">Koramangala</SelectItem>
                      <SelectItem value="Marathahalli">Marathahalli</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea placeholder="Description (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PropertyMediaUpload
            setIsUploading={setIsUploading}
            isUploading={isUploading}
          />
          <Button type="submit" className="w-full" disabled={isPending || isUploading}>
            <ScreenLoader isVisible={isPending} />
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

const seedValues = {
  propertyName: 'Godrej Nurture',
  ownerName: 'Rajesh Kumar',
  ownerType: 'Owner',
  ownerPhone: '9876543210',
  rentAmount: '35000',
  depositAmount: '105000',
  brokerageFee: '20000',
  mapsLocationLink: 'https://maps.app.goo.gl/1234567890',
  location: 'HSR Layout',
  address: '123, Main Street, Anytown, USA',
  description: 'A beautiful property in a great location',
  imageURL: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
}
