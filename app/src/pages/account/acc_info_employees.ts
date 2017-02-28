import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { EmployeeList } from './models';
import { Api } from '../../providers/api/api';
import { AccInfoEmplyeeDetailPage } from './acc_info_employee_detail';


@Component({templateUrl: 'acc_info_employees.html',providers: [Api]})
export class AccInfoEmplyeesPage {
  title: string;
  employees: EmployeeList;

  constructor(
    private nav: NavController,
    private api: Api
  ) {
    this.title = '個人資料-員工清單';
    this.employees = new EmployeeList(api);
  }

  ionViewWillEnter () {
    this.employees.fetch();
  }

  click (employee) {
    this.nav.push(AccInfoEmplyeeDetailPage, {employee: employee});
  }
}
