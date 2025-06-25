import { generateReactHelpers, generateUploadButton, generateUploadDropzone } from '@uploadthing/react'

import type { OurFileRouter } from '../../../server/app/api/uploadthing/core'

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>({
  url: `${import.meta.env.VITE_BACKEND_URL}/api/uploadthing`,
});
