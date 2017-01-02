import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';

declare var google;

@Injectable()
export class GoogleMaps {

	mapElement: any;
	pleaseConnect: any;
	map: any;
	currentPosition: any;
	mapInitialised: boolean = false;
	mapLoaded: any;
	mapLoadedObserver: any;
	apiKey: string;
	zoom: number = 16;
	steps: any;

	constructor(public connectivity: Connectivity) {
		this.apiKey = 'AIzaSyA2GtFNISM5WTflpE4r5EdGZa0z4OgTDic';
	}

	init(mapElement: any, pleaseConnect: any): Promise<any> {
		this.mapElement = mapElement;
		this.pleaseConnect = pleaseConnect;
		return this.loadGoogleMaps();
	}

	loadGoogleMaps(): Promise<any> {
		return new Promise(resolve => {
			if (typeof google == "undefined" || typeof google.maps == "undefined") {
				console.log("Google maps JavaScript needs to be loaded.");
				this.disableMap();
				if (this.connectivity.isOnline()) {
					window['mapInit'] = () => {
						this.initMap().then(() => {
							resolve(true);
						});
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
				if (this.connectivity.isOnline()) {
					this.initMap();
					this.enableMap();
				}
				else {
					this.disableMap();
				}
			}
			this.addConnectivityListeners();
		});

	}

	initMap(): Promise<any> {
		this.mapInitialised = true;
		return new Promise((resolve) => {
			Geolocation.getCurrentPosition().then(position => {
				let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				this.currentPosition = position.coords;
				let mapOptions = {
					center: latLng,
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}
				this.map = new google.maps.Map(this.mapElement, mapOptions);
				resolve(true);
			});
		});
	}

	disableMap(): void {
		if (this.pleaseConnect) {
			this.pleaseConnect.style.display = "block";
		}
	}

	enableMap(): void {
		if (this.pleaseConnect) {
			this.pleaseConnect.style.display = "none";
		}
	}

	addConnectivityListeners(): void {
		document.addEventListener('online', () => {
			console.log("online");
			setTimeout(() => {
				if (typeof google == "undefined" || typeof google.maps == "undefined") {
					this.loadGoogleMaps();
				}
				else {
					if (!this.mapInitialised) {
						this.initMap();
					}
					this.enableMap();
				}
			}, 2000);
		}, false);
		document.addEventListener('offline', () => {
			console.log("offline");
			this.disableMap();
		}, false);
	}

	setMapCenter() {
		this.map.setZoom(this.zoom);
		this.map.setCenter(new google.maps.LatLng(this.currentPosition.latitude, this.currentPosition.longitude));
	}

	setZoomNumber(zoom: number) {
		this.zoom = zoom;
	}

	addMarker(lat: number, lng: number): void {
		let latLng = new google.maps.LatLng(lat, lng);
		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: latLng
		});
	}

	addDirector(location): void {
		let currentPossition = new google.maps.LatLng(this.currentPosition.latitude, this.currentPosition.longitude);
		let directionsService = new google.maps.DirectionsService();
		let directionsDisplay = new google.maps.DirectionsRenderer();
		directionsService.route({
			origin: currentPossition,
			destination: location,
			travelMode: google.maps.TravelMode.DRIVING,
			provideRouteAlternatives: true
		}, (response, status) => {
			if (google.maps.DirectionsStatus.OK === status) {
				console.log(response);
				this.steps = response.routes[0].legs[0].steps;
				console.log(response.routes);
				directionsDisplay.setDirections(response);
				directionsDisplay.setMap(this.map);
			} else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
				console.log('No route could be found between the origin and destination.');
			} else if (status === google.maps.DirectionsStatus.UNKNOWN_ERROR) {
				console.log('A directions request could not be processed due to a server error. The request may succeed if you try again.');
			} else if (status === google.maps.DirectionsStatus.REQUEST_DENIED) {
				console.log('This webpage is not allowed to use the directions service.');
			} else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
				console.log('The webpage has gone over the requests limit in too short a period of time.');
			} else if (status === google.maps.DirectionsStatus.NOT_FOUND) {
				console.log('At least one of the origin, destination, or waypoints could not be geocoded.');
			} else if (status === google.maps.DirectionsStatus.INVALID_REQUEST) {
				console.log('The DirectionsRequest provided was invalid.');
			} else {
				console.log("There was an unknown error in your request. Requeststatus: nn" + status);
			}
		}, (response, status) => {
			console.log(response);
			console.log(status);
		});
	}

}