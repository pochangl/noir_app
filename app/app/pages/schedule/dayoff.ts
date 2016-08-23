import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Api } from '../../providers/api/api';
import '../../rxjs-operators';
import { HomePage } from '../general/home';


@Component({
	templateUrl: 'build/pages/schedule/dayoff.html',
	providers: [Api]
})

export class DayoffPage {
	employee: any;
	dayoffs: any;

	constructor(
		private nav: NavController,
		params: NavParams,
		private http: Api
	){
		this.employee = params.data.employee;
		this.dayoffs = [];
		this.http.get({
			resource_name: "dayoff",
			id: this.employee.id,
			urlParams: {
				employee: this.employee.id
			}
		}).map(response => response.json()
		).subscribe((data)=>{
			this.dayoffs = data;
		});
	}


	submit(){
//		this.http.put(
//			'/api/v1/dayoff/'+ this.employee.id+'/?format=json', {"dayoff": this.dayoffs}
//		).map(response => response.json()
//		);
		this.nav.push(HomePage);
	}
}
