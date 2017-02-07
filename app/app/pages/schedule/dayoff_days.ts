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
  employee: any;
  month: MonthIterator;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;

    this.month = new MonthIterator(this.api);
    this.month.initial(year, month);
    this.employee = params.data.employee;
    this.dayoff = new DayOff(this.api);
    this.dayoffs = new DayOffList(this.api);
    this.dayoffs.filter({
      employee: params.data.employee
    });
  }
  ionViewWillEnter () {
    this.dayoffs.fetch();
  }
  selectDate (day) {
    if (this.dayoffs.search({start_date: day.stringify()}).length > 0) {
      // 若請假資料已存在，刪除資料
      this.dayoffs.search({start_date: day.stringify()})[0].delete();
    } else {
      // 若請假資料不存在，新增資料
      this.dayoff.add(day.stringify(), this.employee);
    }
    this.dayoffs.fetch();
  }
  highlight (day): Boolean {
    return this.dayoffs.search({start_date: day.stringify()}).length > 0;
  }
}
