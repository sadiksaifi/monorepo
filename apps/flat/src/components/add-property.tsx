import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button, buttonVariants } from './ui/button'
import { Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { cn } from '@/lib/utils'
import { ScrollArea } from './ui/scroll-area'
import { PropertyMediaUpload } from './property-media-upload'
import { useMutation } from '@tanstack/react-query'
import { useTRPC } from '@/lib/trpc-client'
import { toast } from 'sonner'
import { ScreenLoader } from './screen-loader'
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
import { z, ZodError } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { TRPCClientError } from '@trpc/client'

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

export const AddProppertyFAB = () => {
  const trpc = useTRPC()
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

  const { isPending, mutate } = useMutation(
    trpc.flat.add.mutationOptions({
      onError: (error) => {
        console.error(error)
        if (error instanceof TRPCClientError) {
          toast.error('Please fill all the required fields correctly!')
        } else {
          toast.error('Something went wrong!')
        }
      },
      onSuccess: (data) => {
        console.log(data)
        toast.success('Property added successfully')
      },
    }),
  )

  return (
    <Drawer>
      <DrawerTrigger
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), '-mr-4 p-7')}
      >
        <Plus className="size-5" />
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log(data)
              const transformedData = formSchema.parse(data)
              // @ts-ignore
              mutate(transformedData)
            })}
            className="h-full px-6"
          >
            <DrawerHeader>
              <DrawerTitle>Add Property</DrawerTitle>
              <DrawerDescription>Add a new property to your portfolio.</DrawerDescription>
              {import.meta.env.DEV && (
                <button
                  type="button"
                  onClick={() => {
                    form.reset(seedValues)
                  }}
                  className="text-sm ml-auto absolute right-2 top-2"
                >
                  Seed Values
                </button>
              )}
              {import.meta.env.DEV && (
                <button
                  type="button"
                  onClick={() => {
                    form.reset(seedValues2)
                  }}
                  className="text-sm ml-auto absolute left-2 top-2"
                >
                  Seed required
                </button>
              )}
            </DrawerHeader>
            <ScrollArea className="h-full w-full">
              <div className="flex flex-col gap-4">
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
                            className={cn(
                              fieldState.invalid && 'border-destructive border',
                            )}
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
                        <Input
                          placeholder="Brokerage Fee (if any)"
                          type="number"
                          {...field}
                        />
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
                          <Input
                            placeholder="Maps Location Link"
                            type="text"
                            {...field}
                          />
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
                <PropertyMediaUpload />
              </div>
              <DrawerFooter className="mb-28 w-full px-0">
                <Button type="submit" className="w-full" disabled={isPending}>
                  <ScreenLoader isVisible={isPending} />
                  Submit
                </Button>
              </DrawerFooter>
            </ScrollArea>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
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

const seedValues2 = {
  propertyName: 'Prestige Shantiniketan',
  ownerType: 'Broker',
  ownerPhone: '9876543210',
  rentAmount: '35000',
  depositAmount: '105000',
  location: 'BTM Layout',
}
