(function () {
  try {
    if (document) {
      var script = document.createElement('script')
      script.src = 'https://s3.amazonaws.com/colortv-sdk/chromecast/js/colortv_sdk.min.js'
      document.querySelector('body').appendChild(script)
    }
  } catch (e) {
    throw Error('document is not defined')
  }
})()
