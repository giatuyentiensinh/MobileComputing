import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { HTTP } from 'ionic-native';
import { MapPage } from '../map/map';


declare var google;
@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {

	address: string;
	results: any[];

	constructor(public navCtrl: NavController) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad SearchPage');
		// this.results = [
		// 	{ address_components: [{ short_name: 'Ha Noi' }], formatted_address: 'Số 1 Đại cổ Việt, Hà Nội' },
		// 	{ address_components: [{ short_name: 'Ha Noi' }], formatted_address: 'Số 1 Đại cổ Việt,Hai Ba Trung,  Hà NộiSố 1 Đại cổ Việt,Hai Ba Trung,  Hà NộiSố 1 Đại cổ Việt,Hai Ba Trung,  Hà Nội' },
		// 	{ address_components: [{ short_name: 'Ha Noi' }], formatted_address: 'Số 1 Đại cổ Việt,Hai Ba Trung,  Hà Nội' },
		// 	{ address_components: [{ short_name: 'Ha Noi' }], formatted_address: 'Số 1 Đại cổ Việt,Hai Ba Trung,  Hà Nội' },
		// 	{ address_components: [{ short_name: 'Ha Noi' }], formatted_address: '1' },
		// 	{ address_components: [{ short_name: 'Ha Noi' }], formatted_address: '1' }
		// ];
	}

	searchAddr() {
		let addr = this.address.split(' ').join('+');
		let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=AIzaSyA2GtFNISM5WTflpE4r5EdGZa0z4OgTDic';
		console.log(addr);
		HTTP.get(url, {}, {})
			.then(resp => {
				console.log(resp.data); // data received by server
				console.log(resp.headers);
				try {
					let results = JSON.parse(resp.data).results;
					this.results = results;
					// for (let result of results) {
					// 	console.log(result.geometry.location);
					// 	console.log(result.formatted_address);
					// }
				} catch (e) {
					console.error("JSON parsing error");
				}
			})
			.catch(error => {
				console.log('error');
				console.log(error.status);
				console.log(error.error); // error message as string
				console.log(error.headers);
			});
	}

	selectAddress(location) {
		this.navCtrl.push(MapPage, { location: location });
	}

	showAll(locations) {
		this.navCtrl.push(MapPage, { locations: locations });
	}
}
