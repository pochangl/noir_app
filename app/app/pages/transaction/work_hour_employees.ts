import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {WorkHourRecordsPage} from '../transaction/work_hour_records';
import {Assignment, EmployeeAssignment, EmployeeAssignmentList, AvailableEmployeeList} from '../project/models';

@Component({
  templateUrl: 'build/pages/transaction/work_hour_employees.html',
  providers: [Api]
})

export class WorkHourEmployeesPage {
  employee_assignments: EmployeeAssignmentList = new EmployeeAssignmentList(undefined);
  title: string;
  start_date: string;
  end_date: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.title = '工時';
    this.start_date = params.data.start_date;
    this.end_date = params.data.end_date;
    // this.employee_assignments.filter(
    //   {start_date__gt: this.start_date},
    //   {end_date__lt: this.end_date}
    // );
  }
  ionViewWillEnter () {
    // this.employee_assignments.fetch();
  }
  click (employee) {
    this.nav.push(WorkHourRecordsPage, {employee: employee});
  }
}
