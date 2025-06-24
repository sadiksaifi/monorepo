export class _VideoPlayer {
  videoElm: HTMLVideoElement = document.createElement('video')
  private objectUrl: string | null = null

  constructor(file: File) {
    this.setFile(file)
  }

  setFile(file: File) {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl)
    }

    const objectUrl = URL.createObjectURL(file)

    this.objectUrl = objectUrl
    this.videoElm.src = objectUrl

    this.videoElm.load()
  }

  async play() {
    if (this.videoElm.readyState < 2) {
      await new Promise<void>((resolve, reject) => {
        this.videoElm.onloadedmetadata = () => resolve()
        this.videoElm.onerror = (error) => {
          reject(new Error(`Failed to load video: ${error}`))
        }
      })
    }

    return this.videoElm.play()
  }

  // DO NOT CHANGE THIS FUNCTION NAME
  // This is used in the VideoShotter class
  // And it is used to determine if the video will end in the next frame
  // Make sure to not change the logic here!!!!!!!!!!!!

  willEnd() {
    const isEnded = this.videoElm.ended
    const willEndNextFrame = this.videoElm.currentTime >= this.videoElm.duration - 1

    return isEnded || willEndNextFrame
  }

  async seek(time: number) {
    this.videoElm.currentTime = time

    await new Promise<void>((resolve) => {
      if (this.willEnd()) {
        resolve()
        return
      }

      this.videoElm.addEventListener(
        'seeked',
        () => {
          console.log('Frame drawn', this.videoElm.currentTime, this.videoElm.duration)
          resolve()
        },
        { once: true },
      )
    })
  }

  reset() {
    console.log(this.objectUrl, this.videoElm.src)
    if (this.videoElm.src) {
      this.videoElm.pause()
      this.videoElm.src = ''
      this.videoElm.removeAttribute('src')
    }

    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl)
      this.objectUrl = null
    }
  }
}

export class VideoShotter {
  canvas: OffscreenCanvas
  ctx: OffscreenCanvasRenderingContext2D

  static async create(file: File, quality: number) {
    const vp = new _VideoPlayer(file)
    await vp.play()
    vp.videoElm.pause()

    const aspectRatio = vp.videoElm.videoHeight / vp.videoElm.videoWidth
    const { width, height } = (() => {
      console.log('Video aspect ratio:', aspectRatio)
      if (aspectRatio > 1) {
        return {
          width: quality,
          height: quality * aspectRatio,
        }
      } else {
        return {
          width: quality * aspectRatio,
          height: quality,
        }
      }
    })()

    vp.reset()
    console.log('Video resolution:', width, height)

    return new VideoShotter(width, height)
  }

  private constructor(width: number, height: number) {
    this.canvas = new OffscreenCanvas(width, height)
    const ctx = this.canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to get canvas context')
    }
    this.ctx = ctx
  }

  private async getFrameBlob(source: CanvasImageSource) {
    this.ctx.drawImage(source, 0, 0, this.canvas.width, this.canvas.height)
    const blob = await this.canvas.convertToBlob({ type: 'image/webp', quality: 1 })
    return blob
  }

  async takeScreenshot(file: File) {
    const result: File[] = []
    const vp = new _VideoPlayer(file)

    try {
      const { promise, resolve } = Promise.withResolvers<void>()

      await vp.play()

      console.log('Video duration:', vp.videoElm.duration)
      const delta = vp.videoElm.duration < 11 ? 3 : 6

      const drawFrame = async () => {
        if (vp.willEnd()) {
          resolve()
          return
        }

        await vp.seek(vp.videoElm.currentTime + delta)
        const blob = await this.getFrameBlob(vp.videoElm)
        const file = new File([blob], window.crypto.randomUUID() + '.webp', {
          type: 'image/webp',
        })
        result.push(file)

        console.log(blob.size, blob)
        requestIdleCallback(drawFrame)
      }

      drawFrame()

      await promise
      return result
    } finally {
      vp.reset()
    }
  }
}
