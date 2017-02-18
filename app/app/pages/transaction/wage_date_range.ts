import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { ProjectListPage } from './list';
import { PersonalAccountBalnaceList } from './models';
import { EmployeeList } from '../account/models';
import { Api } from '../../providers/api/api';
import { MonthIterator } from '../../utils/calendar';
import { WageEmployeesPage } from './wage_employees';


@Component({
  templateUrl: 'build/pages/transaction/paycheck_date_range.html',
  providers: [Api]
})

export class WageDateRangePage {
  title: string;
  employees: EmployeeList;
  date_from: string;
  date_to: string;

  constructor(
    private nav: NavController,
    private api: Api
  ) {
    this.title = '薪給紀錄';
    var today = new Date();
    var date_frome_month = today.getMonth();  // 預設為上一個月
    var tdate_to_month = today.getMonth() + 1;
    var today_day = today.getDate();
    this.date_from = today.getFullYear() + '-' + (date_frome_month < 10 ? '0' + date_frome_month : date_frome_month) + '-' + (today_day < 10 ? '0' + today_day : today_day);
    this.date_to = today.getFullYear() + '-' + (tdate_to_month < 10 ? '0' + tdate_to_month : tdate_to_month) + '-' + (today_day < 10 ? '0' + today_day : today_day);
    this.employees = new EmployeeList(api);
  }
  ionViewWillEnter () {
    this.employees.fetch();
  }

  click (employee) {
    this.nav.push(
      WageEmployeesPage,
      {employee: employee, 'date_from': this.date_from, 'date_to': this.date_to}
    );
  }
}
