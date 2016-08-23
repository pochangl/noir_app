import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {DayoffPage} from '../schedule/dayoff';

@Component({
	templateUrl: 'build/pages/account/list.html',
	providers: [Api]
})

export class DayOffListPage {
	employees: any;
	title: any;

	constructor(
		private nav: NavController,
		private http: Api
	){
		this.employees = [];
		this.title="休假-";
		this.http.get({
			resource_name: "employee"
		}).map(response => response.json()
		).subscribe((data)=>{
			this.employees = data.objects;
		});
	}
	click(employee){
		this.nav.push(DayoffPage, {employee: employee});
	}
}
