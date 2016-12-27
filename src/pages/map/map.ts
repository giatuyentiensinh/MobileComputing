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
			this.maps.addDirector(location.geometry.location);
		} else if (locationsList != undefined) {
			for (let addr of locationsList) {
				console.log(addr.geometry.location);
				this.maps.addMarker(addr.geometry.location.latitude, addr.geometry.location.longitude);
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