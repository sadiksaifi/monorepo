'use client'

import { Button } from '@/components/ui/button'
import { uploadFiles } from '@/lib/uploadthing'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  type FileUploadProps,
  FileUploadTrigger,
} from '@/components/ui/file-upload'
import { Upload, X } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'
import { VideoShotter } from '@/lib/video-shotter'

export function PropertyMediaUpload({
  isUploading,
  setIsUploading,
}: {
  isUploading?: boolean
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [files, setFiles] = React.useState<File[]>([])

  const onUpload: NonNullable<FileUploadProps['onUpload']> = React.useCallback(
    async (files, { onProgress }) => {
      try {
        setIsUploading(true)

        const res = await uploadFiles('imageUploader', {
          files: files,
          onUploadProgress: ({ file, progress }) => {
            onProgress(file, progress)
          },
        })

        res.map(({ ufsUrl }) => console.log('Upload successful: ', ufsUrl))
      } catch (error) {
        console.error('Upload failed:', error)
        setIsUploading(false)

        toast.error(error instanceof Error ? error.message : 'An unknown error occurred')
      } finally {
        setIsUploading(false)
      }
    },
    [],
  )

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    })
  }, [])
  const MAX_FILE_SIZE = 4 * 1024 * 1024
  const MAX_FILES = 20

  return (
    <FileUpload
      accept="image/*, video/*"
      maxFiles={MAX_FILES}
      maxSize={MAX_FILE_SIZE}
      className="w-full"
      beforeChange={async (ev) => {
        const files = Array.from(ev.target.files ?? [])
        const imageFiles = files.filter((file) => file.type.startsWith('image/'))
        const videoFiles = files.filter((file) => file.type.startsWith('video/'))

        const screenshots = (
          await Promise.all(
            videoFiles.map(async (file) => {
              const vs = await VideoShotter.create(file, 720)
              const screenshotFiles = await vs.takeScreenshot(file)
              return screenshotFiles
            }),
          )
        ).flat()
        return [...imageFiles, ...screenshots]
      }}
      onAccept={(files) => setFiles(files)}
      onUpload={onUpload}
      onFileReject={onFileReject}
      multiple
      disabled={isUploading}
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop images here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max {MAX_FILES} files, up to 4MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  )
}
