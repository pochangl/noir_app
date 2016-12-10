import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {DayOffDetailPage} from '../schedule/dayoff_detail';
import {DayOffList} from './models';
import {Employee} from '../account/models';
import {MonthIterator} from '../../utils/calendar';

@Component({
  templateUrl: 'build/pages/general/calendar.html',
  providers: [Api]
})

export class DayOffDaysPage {
  dayoffs: DayOffList;
  selected_employee: any;
  month: MonthIterator;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.month = new MonthIterator(this.api);
    this.month.initial(2016, 12);
    this.selected_employee = params.data.employee;
    this.dayoffs = new DayOffList(this.api);
    this.dayoffs.filter({
      employee: params.data.employee
    });
  }
  ionViewWillEnter () {
    this.dayoffs.fetch();
  }
  click (dayoff) {
    this.nav.push(DayOffDetailPage, {dayoff: dayoff});
  }
  new_record () {
    // 不知道為什麼月份會少一個月？
    var today = new Date();
    var curDate = today.getFullYear() + '-' + (((today.getMonth() + 1) < 10) ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? ('0' + today.getDate()) : today.getDate());
    var curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var initial_data = {
      'employee': {'contact': {'id': this.selected_employee.contact.id, 'name': this.selected_employee.contact.name}, 'id': this.selected_employee.id},
      'id': 0,
      'start_datetime': curDate + 'T' + '08:00:00',
      'start_date': curDate,
      'start_time': '08:00:00',
      'end_datetime': curDate + 'T' + '17:00:00',
      'end_date': curDate,
      'end_time': '17:00:00'
    };
    this.nav.push(DayOffDetailPage, {dayoff: initial_data});
  }
  selectDate (day) {
    console.log(day.stringify())
  }
}
