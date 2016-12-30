import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ViewController } from 'ionic-angular';
import { Locations } from '../../providers/locations';
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
	// locationStep: any;

	constructor(
		public platform: Platform,
		public navCtrl: NavController,
		public params: NavParams,
		public viewCtrl: ViewController,
		public locations: Locations
	) {
		// this.locationStep = [
		// 	{
		// 		html_instructions: 'Gollum',
		// 		duration: {
		// 			text: '20 mins'
		// 		},
		// 		distance: {
		// 			text: '12km'
		// 		}
		// 	},
		// 	{
		// 		html_instructions: 'Frodo',
		// 		duration: {
		// 			text: '20 mins'
		// 		},
		// 		distance: {
		// 			text: '12km'
		// 		}
		// 	},
		// 	{
		// 		html_instructions: 'Samwise Gamgee',
		// 		duration: {
		// 			text: '20 mins'
		// 		},
		// 		distance: {
		// 			text: '12km'
		// 		}
		// 	}
		// ];
	}

	openMarker(marker) {
		console.log(marker);
		this.navCtrl.push(MapPage, { marker: marker });
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
