import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {DayOffPage} from '../schedule/dayoff';

@Component({
	templateUrl: 'build/pages/account/list.html'
})

export class DayOffListPage {
	employees: any;
	title: any;
	
	constructor(private nav: NavController, private http: Http){
		this.employees = [];
		this.title="休假-";
		this.http.get(
			'/api/v1/employee/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.employees = data.objects;
		});
	}
	click(employee){
		this.nav.push(DayOffPage, {employee: employee});
	}
}
