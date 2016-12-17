import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
	selector: 'home-page',
	templateUrl: 'map.html'
})
export class MapPage {

	@ViewChild('map') mapElement: ElementRef;
	map: any;
	mapInitialised: boolean = false;
	apiKey: any;

	constructor(public navCtrl: NavController, public params: NavParams, public connectivityService: ConnectivityService) {
		this.loadGoogleMaps();
		let location = this.params.get('location');
		let locations = this.params.get('locations');
		if (location != undefined) {
			console.log(location.geometry.location);
			Geolocation.getCurrentPosition().then((position) => {
				let currentPossition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				let directionsService = new google.maps.DirectionsService();
				let directionsDisplay = new google.maps.DirectionsRenderer();
				directionsService.route({
					origin: currentPossition,
					destination: location.geometry.location,
					travelMode: 'DRIVING'
				}, (response, status) => {
					if ('OK' === status) {
						directionsDisplay.setDirections(response);
						directionsDisplay.setMap(this.map);
					}
				});
			});
		} else if (locations != undefined) {
			for (let addr of locations) {
				console.log('------------------');
				let marker = new google.maps.Marker({
					position: addr.geometry.location,
					map: this.map
				});
				let infoWindow = new google.maps.InfoWindow({
					content: addr.formatted_address
				});
				console.log('addr: ');
				console.log(addr);
				console.log(marker);
				marker.addListener('click', () => infoWindow.open(this.map, marker));
			}

		}
	}

	loadGoogleMaps() {
		this.addConnectivityListeners();
		if (typeof google == "undefined" || typeof google.maps == "undefined") {
			this.disableMap();
			if (this.connectivityService.isOnline()) {
				console.log("online, loading map");
				//Load the SDK
				window['mapInit'] = () => {
					this.initMap();
					this.enableMap();
				}
				let script = document.createElement("script");
				script.id = "googleMaps";
				if (this.apiKey) {
					script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
				} else {
					script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
				}
				document.body.appendChild(script);
			}
		}
		else {
			if (this.connectivityService.isOnline()) {
				console.log("showing map");
				this.initMap();
				this.enableMap();
			}
			else {
				console.log("disabling map");
				this.disableMap();
			}
		}
	}

	initMap() {
		this.mapInitialised = true;
		Geolocation.getCurrentPosition().then((position) => {
			let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			let mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			new google.maps.Marker({
				position: latLng,
				map: this.map,
				animation: google.maps.Animation.DROP
			});
		});
	}

	disableMap() {
		console.log("disable map");
	}

	enableMap() {
		console.log("enable map");
	}

	addConnectivityListeners() {
		let onOnline = () => {
			setTimeout(() => {
				if (typeof google == "undefined" || typeof google.maps == "undefined") {
					this.loadGoogleMaps();
				} else {
					if (!this.mapInitialised) {
						this.initMap();
					}
					this.enableMap();
				}
			}, 2000);
		};
		let onOffline = () => {
			this.disableMap();
		};
		document.addEventListener('online', onOnline, false);
		document.addEventListener('offline', onOffline, false);

	}
}