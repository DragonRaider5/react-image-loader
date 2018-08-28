export const requestCanceledError = new Error('Request canceled')

export function fetchImage (src) {
  const img = new Image()
  let rejectPromise = null

  const imageLoader = new Promise((resolve, reject) => {
    rejectPromise = reject

    img.onload = function () {
      resolve(this.src)
    }
    img.onerror = reject

    img.src = src
  })
    .then((image) => {
      imageLoader.resolved = true

      return image
    }, (error) => {
      imageLoader.rejected = true

      throw error
    })

  imageLoader.cancel = function () {
    if (!imageLoader.loading()) {
      return false
    }

    imageLoader.canceled = true

    img.src = null
    img.onload = null
    img.onerror = null

    if (rejectPromise) {
      rejectPromise(requestCanceledError)
      rejectPromise = null
    }

    return true
  }

  imageLoader.loading = function () {
    return !(imageLoader.resolved || imageLoader.rejected || imageLoader.canceled)
  }

  return imageLoader
}
