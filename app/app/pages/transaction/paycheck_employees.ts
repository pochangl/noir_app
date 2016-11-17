import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {PaycheckRecordsPage} from '../transaction/paycheck_records';
import {EmployeeList} from "../account/models";

@Component({
	templateUrl: 'build/pages/account/list.html',
	providers: [Api]
})

export class PaycheckEmployeesPage {
	employees: EmployeeList;
	title: string;

	constructor(
		private nav: NavController,
		private api: Api
	){
		this.employees = new EmployeeList(this.api);
		this.title = "薪資";
	}
  ionViewWillEnter(){
    this.employees.fetch();
  }
	click(employee){
		this.nav.push(PaycheckRecordsPage, {employee: employee});
	}
}
