import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {EmployeeAssignmentList} from '../project/models';
import {Employee} from '../account/models';

@Component({templateUrl: 'work_hour_employees.html',providers: [Api]})
export class WorkHourEmployeesPage {
  employee_assignments: EmployeeAssignmentList;
  employee: Employee;
  employee_name: string;
  date_from: string;
  date_to: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.employee = params.data.employee;
    this.date_from = params.data.date_from;
    this.date_to = params.data.date_to;
    this.employee_name = this.employee.contact.name;
    this.employee_assignments = new EmployeeAssignmentList(api);
    this.employee_assignments.filter({
      employee: this.employee.id,
      date_from: this.date_from,
      date_to: this.date_to
    });
  }
  ionViewWillEnter () {
    this.employee.fetch();
    this.employee_assignments.fetch();
  }
  click (employee_assignment) {
  }
}
