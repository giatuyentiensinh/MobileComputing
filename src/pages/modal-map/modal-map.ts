import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { GoogleMaps } from '../../providers/google-maps';
import { MapPage } from '../map/map';

/*
  Generated class for the ModalMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	templateUrl: 'modal-map.html'
})
export class ModalMapPage {

	constructor(
		public platform: Platform,
		public navCtrl: NavController,
		public params: NavParams,
		public viewCtrl: ViewController,
		public googleMap: GoogleMaps
	) {
		console.log(googleMap.steps);
	}

	openMarker(marker) {
		console.log(marker);
		// this.navCtrl.push(MapPage, { marker: marker });
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
