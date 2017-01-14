import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { ProjectListPage } from './list';
import { AssignmentDateList } from '../project/models';
import { Api } from '../../providers/api/api';
import { MonthIterator } from '../../utils/calendar';


@Component({
  templateUrl: 'build/pages/transaction/transaction_wages_status.html',
  providers: [Api]
})

export class WagesStatusPage {
  dates: AssignmentDateList;
  start_date: string;
  end_date: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.dates = new AssignmentDateList(api);
    console.log(this.dates);
      var today = new Date();
      var today_month = today.getMonth() + 1;
      var today_day = today.getDate();
      var today_date = today.getFullYear() + '-' + (today_month < 10 ? '0' + today_month : today_month) + '-' + (today_day < 10 ? '0' + today_day : today_day);
      this.start_date = today_date;
      this.end_date = today_date;
  }
  ionViewWillEnter () {
    this.dates.fetch();
  }

  click (date) {
    // this.nav.push(ProjectListPage, {'date': date});
  }
}
