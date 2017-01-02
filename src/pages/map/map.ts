import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, Platform } from 'ionic-angular';
import { GoogleMaps } from '../../providers/google-maps';
import { Locations } from '../../providers/locations';
import { ModalMapPage } from '../modal-map/modal-map';
@Component({
	selector: 'home-page',
	templateUrl: 'map.html'
})
export class MapPage {

	@ViewChild('map') mapElement: ElementRef;
	@ViewChild('pleaseConnect') pleaseConnect: ElementRef;

	constructor(
		public navCtrl: NavController,
		public params: NavParams,
		public modalCtrl: ModalController,
		public actionSheetCtrl: ActionSheetController,
		public maps: GoogleMaps,
		public platform: Platform,
		public locations: Locations
	) {
		let location = this.params.get('location');
		let locationsList = this.params.get('locations');
		let marker = this.params.get('marker');
		if (location != undefined) {
			this.maps.addDirector(location.geometry.location);
		} else if (locationsList != undefined) {
			for (let addr of locationsList) {
				console.log(addr.geometry.location);
				this.maps.addMarker(addr.geometry.location.latitude, addr.geometry.location.longitude);
			}
		} else if (marker != undefined) {
			this.maps.addDirector(marker);
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

	setCenter() {
		this.maps.setMapCenter();
	}

	setZoom() {
		this.actionSheetCtrl.create({
			title: 'Chọn cỡ zoom bản đồ',
			buttons: [
				{
					text: '1',
					handler: () => {
						this.maps.setZoomNumber(1);
					}
				}, {
					text: '2',
					handler: () => {
						this.maps.setZoomNumber(2);
					}
				}, {
					text: '4',
					handler: () => {
						this.maps.setZoomNumber(4);
					}
				}, {
					text: '8',
					handler: () => {
						this.maps.setZoomNumber(8);
					}
				}, {
					text: '12',
					handler: () => {
						this.maps.setZoomNumber(12);
					}
				}, {
					text: '16',
					handler: () => {
						this.maps.setZoomNumber(16);
					}
				}, {
					text: 'Hủy bỏ',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		}).present();		
	}

	openDirection() {
		this.modalCtrl.create(ModalMapPage).present();
	}
}