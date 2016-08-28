import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {PayCheckListRecordsPage} from '../transaction/paycheck_list_records';

@Component({
	templateUrl: 'build/pages/account/list.html',
	providers: [Api]
})

export class PayCheckChooseEmployeePage {
	employees: any;
	title: any;

	constructor(private nav: NavController, private http: Api){
		this.employees = [];
		this.title = "薪資-";
		this.http.get({
			//'/api/v1/employee/?format=json'
			resource_name: "employee"
		}).map(response => response.json()
		).subscribe((data)=>{
			this.employees = data.objects;
		});
	}
	click(employee){
		this.nav.push(PayCheckListRecordsPage, {employee: employee});
	}
}
