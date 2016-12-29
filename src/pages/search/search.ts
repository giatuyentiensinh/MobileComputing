import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Locations } from '../../providers/locations';
import { MapPage } from '../map/map';

declare var google;

@Component({
	selector: 'page-search',
	templateUrl: 'search.html',
})
export class SearchPage {

	address: string;

	constructor(public navCtrl: NavController, public locations: Locations) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad SearchPage');
	}

	searchAddr() {
		let addr = this.address.split(' ').join('+');
		this.locations.search(addr);
	}

	selectAddress(location) {
		console.log(location);		
		this.navCtrl.push(MapPage, { location: location });
	}

	showAll(locations) {
		this.navCtrl.push(MapPage, { locations: locations });
	}
}
