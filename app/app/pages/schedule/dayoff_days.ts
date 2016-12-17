import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
// import {DayOffDetailPage} from '../schedule/dayoff_detail';
import {DayOff, DayOffList} from './models';
import {Employee} from '../account/models';
import {MonthIterator} from '../../utils/calendar';

@Component({
  templateUrl: 'build/pages/general/calendar.html',
  providers: [Api]
})

export class DayOffDaysPage {
  dayoff: DayOff;
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
    this.dayoff = new DayOff(this.api);
    this.dayoffs = new DayOffList(this.api);
    this.dayoffs.filter({
      employee: params.data.employee
    });
  }
  ionViewWillEnter () {
    this.dayoffs.fetch();
  }
  // new_record () {
  //   // 不知道為什麼月份會少一個月？
  //   var today = new Date();
  //   var curDate = today.getFullYear() + '-' + (((today.getMonth() + 1) < 10) ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? ('0' + today.getDate()) : today.getDate());
  //   var curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  //   var initial_data = {
  //     'employee': {'contact': {'id': this.selected_employee.contact.id, 'name': this.selected_employee.contact.name}, 'id': this.selected_employee.id},
  //     'id': 0,
  //     'start_datetime': curDate + 'T' + '08:00:00',
  //     'start_date': curDate,
  //     'start_time': '08:00:00',
  //     'end_datetime': curDate + 'T' + '17:00:00',
  //     'end_date': curDate,
  //     'end_time': '17:00:00'
  //   };
  //   // this.nav.push(DayOffDetailPage, {dayoff: initial_data});
  // }
  selectDate (day) {
    if (this.dayoffs.search({start_date: day.stringify()}).length > 0) {
      // 若請假資料已存在，刪除資料
      this.dayoffs.search({start_date: day.stringify()})[0].delete();
    } else {
      // 若請假資料不存在，新增資料
      this.dayoff.add(day.stringify(), this.selected_employee);
    }
    this.dayoffs.fetch();
  }
  highlight (day): Boolean {
    return this.dayoffs.search({start_date: day.stringify()}).length > 0;
  }
}
