<h1> ColorTV Receiver SDK </h1>

The ColorTV Receiver SDK is a JavaScript library for Custom Receiver Chromecast applications that enables developers to monetize their apps.
 
 <h2>Installation</h2>
 
To install the stable version:
```javascript
npm install --save colortv-receiver-sdk 
```
This assumes you are using npm as your package manager.
If you don't, you can get SDK from [here](http://www.google.pl).  

  <h2>Placements</h2>  
 
 All placements are available in the window.ColorTVSDK object :
<ul>
 <li>VIDEO</li>
 <li>INTERSTITIAL</li>
 <li>FULL_SCREEN</li>
 <li>APP_WALL</li>
 <li>CONTENT</li>
</ul>
 <h1>Example</h1>
 
You can run our example in your browser. In order to run this file, you need two things:
* appId from [dashboard](http://www.colortv.com/dashboard)
* User-Agent switcher for your browser

Firstly, set your appId in [example file](https://github.com/color-tv/ColorTV-ReceiverSDK/blob/master/example/example.html). Secondly install user-aget switcher in your browser.
 For Chrome, we advise [user-agent switcher plugin](https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg ) 
 Remember to disable AdBlock.  
 
 Below you can find example user-agent that should be set in user-agent switcher. 
```useragent
 Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36 CrKey/1.19a.63621  
 ```
 ```html
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Chromecast Demo Application</title>
</head>
<body>
<div id="insertAdsHere">
    <!--
        You need to specify the DOM element where you want to show ads.
        It must be the first child of the body tag.
     -->
</div>
<script src="//www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js"></script>
<script src="./colortv_sdk.js"></script>
<script>
    window.onload = function () {
       /**
       *  Obtain ColorTV instance from SDK
       */
        var colortv = window.ColorTVSDK.getInstance() 
        var castManager = window.cast.receiver.CastReceiverManager.getInstance()
        /**
        * In order for SDK to monitor available senders, you must call proper functions in castSDK callbacks.
        * If you omit this section you will not be able to monetize.
        */
        castManager.onSenderConnected = (event)=> {
            colortv.onSenderConnected(event)
        }
        castManager.onSenderDisconnected = (event)=> {
            colortv.onSenderDisconnected(event)
        }
        castManager.onSystemVolumeChanged = (event)=> {
            colortv.onSystemVolumeChanged(event)
        }
        castManager.onShutdown = (event)=> {
            colortv.onShutdown(event)
        }
        /**
        * We provide you a set of callbacks
        */
        colortv.onAdLoaded = function() {
           console.log('Ad is loaded')
        }
        
         colortv.onAdNotLoaded = function() {
         console.log('Ad is not loaded')
        }
        
         colortv.onAdExpired = function(placement) {
         console.log(placement + 'ad expired')
        }
        
         colortv.onSdkInitialized = function() {
         console.log('SDK is ready to use')
        }
        
         colortv.onUnsupportedAdType = function() {
         console.log('Unsupported ad type')
        }
        
         colortv.onConversionComplete = function() {
         console.log('Conversion complete')
        }
        /**
        * You must initialize the SDK first by specifying the appID.
        * To create an appId you must generate it in our dashboard http://www.colortv.com/dashboard
        */
        colortv.init({
            appId: 'INSERT_YOU_APPID_HERE'
        }).then(() => {
            /**
             * The init method needs to be called before castManager.start() to establish the correct channel connection.
             */
            castManager.start()
            /**
             * You must load the ad before showing it, in order to create the optimal user experience you should provide enough time
             * to load the required assets. To choose a specific ad unit to show, call the loadAd with appropriate placement that is 
             * configured in the dashboard. Ads have expiration time after being loaded (~10 minutes).
             */
            colortv.loadAd({
                placement: ColorTVSDK.Placements.INTERSTITIAL
            }).then(() => {
                /**
                 * Call showAd function to show the ad after loading it.  
                 * You must pass the placement parameter (created in the dashboard) and node HTML DOM element you want us to append to.
                 * It can be either a jQuery object or a Vanilla JS object.
                 */
                colortv.showAd({
                    placement: ColorTVSDK.Placements.INTERSTITIAL,
                    node: document.getElementById('insertAdsHere')
                }).then(() => {
                    console.info('Demo Finished')
                }).catch((error) => {
                    console.error(error)
                })
            }).catch((error) => {
                console.error(error)
            })
        }).catch((error) => {
            console.error(error)
        })
    }
</script>
</body>
</html>
 ```
 The Google Cast SDK and ColoTV Receiver SDK must be included in your project. 
 The SDK can be used in two ways: you can get it from the window object or it can be imported as a module.
 Next the SDK needs to be initialized. An appID is generated in our dashboard [dashboard](http://www.colortv.com/dashboard) and is used to identify your app.
 
The SDK must be initialized before you start castManger because of the additional channels Colortv Sender SDK communicates with the Receiver App on.
You may append your callback to any of the core functions of the SDK: init, loadAd and showAd 
 
In order to optimize the user experience we ask that you pause your application when launching our SDK, because if something happens during the ad the user will only be able to react by closing the SDK. 
 
In the following example Promises are used for callbacks.  
The callback takes the parameters object as first argument and the second argument can be used for you to pass the function that will be fired as soon as the SDK function is complete. 
The callback function takes the error object as the first parameter ( error-first style).
 
 Example:
 <h4>Callback</h4>
 ```javascript
 var params = {
    placement: ColorTVSDK.Placements.Interstitial
 }
 var callback = function(error){
  if(error){
    // handle error
    return
  }
  // continue script
 }
 colortv.loadAd(params, callback)
 ```
 <h4>Promise<h4/>
 ```javascript
 var params = {
    placement: ColorTVSDK.Placements.Interstitial
 }
 colortv.loadAd(params).then(function(){
    //success
 }).catch(function(error){
  if(error){
  // handle error
  return
  }})
 ```
 <h4>Events</h4>
 ```javascript
  var params = {
    placement: ColorTVSDK.Placements.Interstitial
 }
  window.ColorTVSDK.EventManager.on(ColorTVSDK.Events.AD_LOADED, function () {
      // handle
    })
  colortv.loadAd(params)
   
 ```
