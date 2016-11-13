import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {DayOffDetailPage} from '../schedule/dayoff_detail';
import {MyDayOffList} from "./models";
import {Employee} from "../account/models";

@Component({
	templateUrl: 'build/pages/schedule/dayoff_days.html',
  providers: [Api]
})

export class DayOffDaysPage {
  dayoffs: MyDayOffList;
  employee: Employee;

	constructor(
		private nav: NavController,
		params: NavParams,
		private api: Api
	){
		this.dayoffs = new MyDayOffList(this.api);
    this.employee = params.data.employee;
    this.dayoffs.set_employee(this.employee);
	}
  ionViewWillEnter(){
    this.dayoffs.fetch();
  }
	click(dayoff){
		this.nav.push(DayOffDetailPage, {dayoff: dayoff});
	}
}
