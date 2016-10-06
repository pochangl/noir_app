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
	dayoffs_count: number;

	constructor(
		private nav: NavController,
		params: NavParams,
		private http: Api
	){
		this.employee = params.data.employee;
		this.dayoffs = [];
		this.dayoffs_count = 0;
		this.http.get({
			resource_name: "dayoff",
			urlParams: {
				"employee": this.employee.id,
			}
		}).map(
			response => response.json()
		).subscribe(
			data => {
				//使用id_count以避免不止一筆資料之情形。
				//直接把[id_count]加在objects後面，不知道有無後遺症？
				this.dayoffs_count = data.objects.length;
				this.dayoffs = data.objects[this.dayoffs_count-1];
			},
			err => console.error(err)
		);
	}

	submit(){
		this.http.put(
			{
				resource_name: "dayoff",
				//若用post,如何取得現有dayoff最大的一筆id?
				id: this.dayoffs.id,
			},this.dayoffs
		).subscribe(
			data=>{
				//this.dayoffs = data;
			},
			err => console.error(err)
		);
/*
		this.nav.push(HomePage);
		*/
	}
}
