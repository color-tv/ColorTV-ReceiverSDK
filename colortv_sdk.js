(function () {
  try {
    if (document) {
      var script = document.createElement('script')
      script.src = 'https://s3.amazonaws.com/assets.replayt.com/dev/cast/test_published/colortv_sdk.js'
      document.querySelector('body').appendChild(script)
    }
  } catch (e) {
    throw Error('document is not defined')
  }
})()
