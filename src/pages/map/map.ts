import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps } from '../../providers/google-maps';
import { Locations } from '../../providers/locations';

declare var google;

@Component({
	selector: 'home-page',
	templateUrl: 'map.html'
})
export class MapPage {

	@ViewChild('map') mapElement: ElementRef;
	@ViewChild('pleaseConnect') pleaseConnect: ElementRef;

	constructor(public navCtrl: NavController, public params: NavParams, public maps: GoogleMaps, public platform: Platform, public locations: Locations) {
		let location = this.params.get('location');
		let locationsList = this.params.get('locations');
		if (location != undefined) {
			let currentPossition = new google.maps.LatLng(this.maps.currentPosition.latitude, this.maps.currentPosition.longitude);
			let directionsService = new google.maps.DirectionsService();
			let directionsDisplay = new google.maps.DirectionsRenderer();
			directionsService.route({
				origin: currentPossition,
				destination: location.geometry.location,
				travelMode: 'DRIVING'
			}, (response, status) => {
				if ('OK' === status) {
					directionsDisplay.setDirections(response);
					directionsDisplay.setMap(this.maps.map);
				}
			});
		} else if (locationsList != undefined) {
			for (let addr of locationsList) {
				console.log('------------------');
				let marker = new google.maps.Marker({
					position: addr.geometry.location,
					map: this.maps.map
				});
				console.log('addr: ' + addr);
				console.log(addr);
				// let infoWindow = new google.maps.InfoWindow({
				// 	content: addr.formatted_address
				// });
				// console.log(marker);
				// marker.addListener('click', () => infoWindow.open(this.maps.map, marker));
			}
		}
	}

	ionViewDidLoad() {
		this.platform.ready().then(() => {
			let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            Promise.all([
                mapLoaded,
            ]).then(result => {
                this.maps.addMarker(this.maps.currentPosition.latitude, this.maps.currentPosition.longitude);
            });
		});
	}
}