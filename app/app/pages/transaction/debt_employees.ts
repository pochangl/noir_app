import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {DebtRecordsPage} from '../transaction/debt_records';
import {EmployeeList} from "../account/models";

@Component({
	templateUrl: 'build/pages/account/list.html',
	providers: [Api]
})


export class DebtEmployeesPage {
	employees: EmployeeList;
	title: string;

	constructor(
		private nav: NavController,
		private api: Api
	){
		this.employees = new EmployeeList(this.api);
		this.title = "借款"
	}
  ionViewWillEnter(){
    this.employees.fetch();
  }
	click(employee){
		this.nav.push(DebtRecordsPage, {employee: employee});
	}
}
