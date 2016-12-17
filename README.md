# Mobile Computing Course
==============================

## Cross Platform using `Ionic2 Framework`

* Include:

 - Angular 2
 - Cordova v6.4.0
 - Ionic 2 plugin:
   - cordova-plugin-geolocation 2.4.1 "Geolocation"
   - cordova-plugin-network-information 1.3.1 "Network Information"

## Setup

* install nodeJS
* install ionic and cordova

 ```
 $ npm install -g ionic cordova
 ```

* clone repo and cd root folder
* setup

 ```
 $ npm install
 $ cordova platform add android
 $ coroval plugin add cordova-plugin-geolocation
 $ coroval plugin add cordova-plugin-network-information
 ```

* run

 ```
 $ ionic serve        // run with brower
 $ ionic run android  // build and install project into android
 ```

* Debugging with [Chrome](https://ionicframework.com/docs/v2/resources/developer-tips/)


## Reference

* https://ionicframework.com/docs/
* https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple
* http://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/

## Image

![Image 1](/Image1.png)
![Image 2](/Image2.png)

## Auth: Tuyenng
