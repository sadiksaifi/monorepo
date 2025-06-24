import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { VideoShotter } from '@/lib/video-shotter'

const RESOLUTION = {
  width: 1280,
  height: 720,
}

export const Route = createFileRoute('/test')({
  component: function RouteComponent() {
    const form = useForm()
    const [blobs, setBlobs] = useState<Blob[]>([])
    const [preview, setPreview] = useState<string[]>([])
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      if (blobs.length === 0) return;

      const tempUrls = blobs.map((blob) => URL.createObjectURL(blob))

      setPreview(tempUrls)

      return () => {
        tempUrls.forEach((url) => URL.revokeObjectURL(url))
      }
    }, [blobs])

    return (
      <div className="p-4">
        <div role="preview"></div>

        <canvas
          ref={canvasRef}
          width={RESOLUTION.width}
          height={RESOLUTION.height}
          className="w-full h-auto border"
        ></canvas>

        <br />
        <br />
        <br />
        <br />

        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={async (ev) => {
                      try {
                        const files = Array.from(ev.target.files ?? [])
                        if (files.length === 0) return

                        const file = files[0]
                        const vs = new VideoShotter()
                        const blobs = await vs.takeScreenshot(file)
                        console.log('Blobs:', blobs)

                        setBlobs(blobs)
                      } catch (error) {
                        console.error('Error taking screenshot:', error)
                      }
                    }}
                  />

                  <input type="hidden" defaultValue={field.value} name={field.name} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <ul>
          <li>
            Preview:
          </li>

          {preview.map((url, index) => (
            <li key={index}>
              <img src={url} alt={`Screenshot ${index + 1}`} className="w-64 h-auto" />
            </li>
          ))}
        </ul>
      </div>
    )
  },
})
