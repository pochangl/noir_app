import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { ProjectListPage } from './list';
import { PersonalAccountBalnaceList } from './models';
import { Api } from '../../providers/api/api';
import { MonthIterator } from '../../utils/calendar';
import { WageEmployeesPage } from './wage_employees';


@Component({
  templateUrl: 'build/pages/transaction/paycheck_date_range.html',
  providers: [Api]
})

export class WageDateRangePage {
  title: string;
  personal_account_balances: PersonalAccountBalnaceList;
  date_from: string;
  date_to: string;

  constructor(
    private nav: NavController,
    private api: Api
  ) {
    this.title = '薪給紀錄';
    var today = new Date();
    var today_month = today.getMonth() + 1;
    var today_day = today.getDate();
    var today_date = today.getFullYear() + '-' + (today_month < 10 ? '0' + today_month : today_month) + '-' + (today_day < 10 ? '0' + today_day : today_day);
    this.date_from = today_date;
    this.date_to = today_date;
  }
  ionViewWillEnter () {
  }

  next_step () {
    this.nav.push(
      WageEmployeesPage,
      {'date_from': this.date_from, 'date_to': this.date_to}
    );
  }
}
