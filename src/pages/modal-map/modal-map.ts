import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Locations } from '../../providers/locations';

/*
  Generated class for the ModalMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	templateUrl: 'modal-map.html'
})
export class ModalMapPage {
	// locations: any;

	constructor(
		public platform: Platform,
		public params: NavParams,
		public viewCtrl: ViewController,
		public locations: Locations
	) {
		// this.locations = [
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
		// console.log(this.locations);
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}

}
