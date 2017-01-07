import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {DayOffDaysPage} from '../schedule/dayoff_days';
import {EmployeeList} from '../account/models';

@Component({
  templateUrl: 'build/pages/account/list.html',
  providers: [Api]
})

export class DayOffEmployeesPage {
  employees: EmployeeList;
  title: string;

  constructor(
    private nav: NavController,
    private api: Api
  ) {
    this.employees = new EmployeeList(this.api);
    this.title = '休假';
  }
  ionViewWillEnter() {
    this.employees.fetch();
  }
  click(employee) {
    this.nav.push(DayOffDaysPage, {employee: employee});
  }
}
