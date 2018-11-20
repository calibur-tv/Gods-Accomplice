const mixin = {
  methods: {
    resizeImage(url, options = {}) {
      if (
        /\/\/(upload-images|upload|cdn2)\.jianshu\.io/.test(url) &&
        options.width > 0
      ) {
        const urlWithoutProtocol = url.replace(/http:/, '')

        const { width } = options
        const height = options.height || options.width
        const mode = options.mode || 1

        return `${urlWithoutProtocol}?imageMogr2/auto-orient/strip|imageView2/${mode}/w/${width}/h/${height}`
      }

      return url
    }
  }
}

export default mixin
