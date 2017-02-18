import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { ProjectListPage } from './list';
import { EmployeeAssignment } from '../project/models';
import { Api } from '../../providers/api/api';
import { MonthIterator } from '../../utils/calendar';
import {WorkHourEmployeesPage} from '../transaction/work_hour_employees';


@Component({
  templateUrl: 'build/pages/transaction/work_hour_date_range.html',
  providers: [Api]
})

export class WorkHourDateRangePage {
  ea: EmployeeAssignment;
  start_date: string;
  end_date: string;

  constructor(
    private nav: NavController,
    private api: Api
  ) {
    // this.ea = new EmployeeAssignment(api);
    var today = new Date();
    var today_month = today.getMonth() + 1;
    var today_day = today.getDate();
    var today_date = today.getFullYear() + '-' + (today_month < 10 ? '0' + today_month : today_month) + '-' + (today_day < 10 ? '0' + today_day : today_day);
    this.start_date = today_date;
    this.end_date = today_date;
  }
  ionViewWillEnter () {
    this.ea.fetch();
  }

  next_step () {
    this.nav.push(
      WorkHourEmployeesPage,
      {'start_date': this.start_date, 'end_date': this.end_date}
    );
  }
}
