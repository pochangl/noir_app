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
		console.log(dayoff);
		this.nav.push(DayOffDetailPage, {dayoff: dayoff});
	}
	new_record(){
		//不知道為什麼月份會少一個月？
		var today = new Date();
		var curDate = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
		var curTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var initial_data = {
			"employee": {"contact": {"id": this.employee.contact.id, "name": this.employee.contact.name}, "id": this.employee.id},
									"id": 1,
									"start_datetime": curDate + "T" + "08:00:00",
									"start_date": curDate,
									"start_time": "08:00:00",
									"end_datetime": curDate + "T" + "17:00:00",
									"end_date": curDate,
									"end_time": "17:00:00"
		};
		this.nav.push(DayOffDetailPage, {dayoff: initial_data});
	}
}
