# Mobile Computing Course

## Cross Platform using `Ionic2 Framework`

* Information:

 - Cordova CLI: 6.4.0
 - Ionic Framework Version: 2.0.0-rc.4
 - Ionic CLI Version: 2.1.14
 - Ionic App Lib Version: 2.1.7
 - Ionic App Scripts Version: 0.0.47
 - OS: Linux 3.19
 - Node Version: v4.4.2
 - Plugin:
  ```
   cordova-plugin-geolocation 2.4.1 "Geolocation"
   cordova-plugin-network-information 1.3.1 "Network Information"
  ```

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

* Note

  * Web-developer using ('src/providers/locations.ts')

  ```typescript
  this.http.get(url).map(res => res.json())
  	.subscribe(data => {
  		this.data = this.applyHaversine(data.results);
  		resolve(this.data);
  	});
  ...
  ```

  * Mobile-developer using ('src/providers/locations.ts')

  ```typescript
  ...
  HTTP.get(url, {}, {})
    .then(resp => {
        console.log(resp.data); // data received by server
        try {
            this.data = this.applyHaversine(JSON.parse(resp.data).results);
            resolve(this.data);
        } catch (e) {
            console.error("JSON parsing error");
        }
    })
    .catch(error => {
        console.log('error');
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
    });
  ```

## Reference

* https://ionicframework.com/docs/
* https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple
* http://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/
* http://www.joshmorony.com/create-a-nearby-places-list-with-google-maps-in-ionic-2-part-2/

## Image

![Image 1](/Image1.png)
![Image 2](/Image2.png)

## Auth: Tuyenng
