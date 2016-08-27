import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {DebtListRecordsPage} from '../transaction/debt_list_records';

@Component({
	templateUrl: 'build/pages/account/list.html',
	providers: [Api]
})


export class DebtChooseEmployeePage {
	employees: any;
	title: any;

	constructor(private nav: NavController, private http: Api){
		this.employees = [];
		this.title = "借款-"
		this.http.get({
			resource_name: "employee"
		}).map(response => response.json()
		).subscribe((data)=>{
			this.employees = data.objects;
		});
	}
	click(employee){
		this.nav.push(DebtListRecordsPage, {employee: employee});
	}
}
