import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {PersonalAccountBalnaceList} from './models';
import {EmployeeList} from '../account/models';
import {WorkHourRecordsPage} from '../transaction/work_hour_records';
import {Assignment, EmployeeAssignment, EmployeeAssignmentList, AvailableEmployeeList} from '../project/models';

@Component({
  templateUrl: 'build/pages/transaction/wage_employees.html',
  providers: [Api]
})

export class WageEmployeesPage {
  personal_account_balances: PersonalAccountBalnaceList;
  employees: EmployeeList;
  title: string;
  date_from: string;
  date_to: string;
  test: any;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.title = '薪給紀錄';
    this.personal_account_balances = new PersonalAccountBalnaceList(api);
    this.date_from = params.data.date_from;
    this.date_to = params.data.date_to;
    this.test = this.personal_account_balances.filter(
      {date_from: this.date_from, date_to: this.date_to}
    );
    this.employees = this.test.filter();
    console.log(this.test);
  }
  ionViewWillEnter () {
    this.personal_account_balances.fetch();
  }
  click (employee) {
    this.nav.push(WorkHourRecordsPage, {employee: employee});
  }
}
