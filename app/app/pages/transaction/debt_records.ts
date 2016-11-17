import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Headers} from '@angular/http';
import { Api } from '../../providers/api/api';
import {DebtDetailPage} from '../transaction/debt_detail';
import {MyDebtList} from "./models";
import {Employee} from "../account/models";

@Component({
	templateUrl: 'build/pages/transaction/debt_records.html',
	providers: [Api]
})

export class DebtRecordsPage {
	title: "工資";
	debts: MyDebtList;
	employee: Employee;

	constructor(
		private nav: NavController,
		params: NavParams,
		private api: Api
	){
		this.debts = new MyDebtList(this.api);
		this.employee = params.data.employee;
		this.debts.set_employee(this.employee);
	}
  ionViewWillEnter(){
    this.debts.fetch();
  }
	click(debt){
		this.nav.push(DebtDetailPage, {debt: debt});
	}
}
