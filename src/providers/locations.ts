import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HTTP } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the Locations provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Locations {

    data: any;
    steps: any;
    currentLocation: any;

    constructor(public http: Http) {
        console.log('Hello Locations Provider');
        Geolocation.getCurrentPosition().then(position => {
            this.currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        });
    }

    search(addr: string): Promise<any> {
        return new Promise(resolve => {
            let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=AIzaSyA2GtFNISM5WTflpE4r5EdGZa0z4OgTDic';
            this.http.get(url).map(res => res.json())
                .subscribe(data => {
                    this.data = this.applyHaversine(data.results);
                    resolve(this.data);
                });
            // HTTP.get(url, {}, {})
            // .then(resp => {
            //     console.log(resp.data); // data received by server
            //     // console.log(resp.headers);
            //     try {
            //         this.data = this.applyHaversine(JSON.parse(resp.data).results);
            //         resolve(this.data);
            //     } catch (e) {
            //         console.error("JSON parsing error");
            //     }
            // })
            // .catch(error => {
            //     console.log('error');
            //     console.log(error.status);
            //     console.log(error.error); // error message as string
            //     console.log(error.headers);
            // });
        });
    }

    direction(addr: string): Promise<any> {
        return new Promise(resolve => {
            let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + this.currentLocation.lat + ',' + this.currentLocation.lng + '&destination=' + addr + '&key=AIzaSyCmfWiweKXK4IrNugFwvK9Z7oliPh7eo2U';
            // let header = new Headers();
            // header.append('Content-Type', 'application/json');
            // header.append('Access-Control-Allow-Origin', '*');
            // this.http.get(url, { headers: header })
            //     .map(res => res.json())
            //     .subscribe(data => {
            //         console.log(data);
            //         // resolve(data);
            //     });

            console.log(url);
            HTTP.get(url, {}, {})
                .then(resp => {
                    console.log(resp.data); // data received by server
                    this.steps = JSON.parse(resp.data).routes[0].legs[0].steps;
                })
                .catch(error => {
                    console.log('error');
                    console.log(error.status);
                    console.log(error.error); // error message as string
                    console.log(error.headers);
                });
        });
    }


    applyHaversine(locations) {
        locations.map(location => {
            let placeLocation = {
                lat: location.geometry.location.lat,
                lng: location.geometry.location.lng
            };
            location.distance = parseFloat(this.getDistanceBetweenPoints(
                this.currentLocation,
                placeLocation,
                'km'
            ).toFixed(2));
            location.location = location.geometry.location;
        });
        return locations;
    }


    getDistanceBetweenPoints(start, end, units) {
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;

        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d;
    }

    toRad(x) {
        return x * Math.PI / 180;
    }
}
