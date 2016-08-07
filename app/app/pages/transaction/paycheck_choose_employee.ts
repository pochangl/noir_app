import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import {PayCheckListRecordsPage} from '../transaction/paycheck_list_records';

@Component({
	templateUrl: 'build/pages/account/list.html'
})

export class PayCheckChooseEmployeePage {
	employees: any;
	title: any;
	
	constructor(private nav: NavController, private http: Http){
		this.employees = [];
		this.title = "薪資-";
		this.http.get(
			'/api/v1/employee/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.employees = data.objects;
		});
	}
	click(employee){
		this.nav.push(PayCheckListRecordsPage, {employee: employee});
	}
}
