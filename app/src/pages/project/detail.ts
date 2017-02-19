import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { Assignment, EmployeeAssignment, EmployeeAssignmentList, AvailableEmployeeList } from './models';

@Component({templateUrl: 'detail.html'})
export class ProjectDetailPage {
  assignment: Assignment;
  availables: AvailableEmployeeList = new AvailableEmployeeList(undefined);
  selected_date: string;

  constructor(
        private nav: NavController,
        params: NavParams
  ) {
    this.assignment = params.data.assignment;
    this.availables.construct(this.assignment);
    this.selected_date = params.data.assignment.start_datetime.split('T')[0];
  }
  ionViewWillEnter () {
    this.assignment.fetch();
    this.availables.fetch();
  }
  toggle (employee) {
    if (this.assignment.has(employee)) {
      this.assignment.discard(employee);
    } else {
      this.assignment.add(employee);
    }
  }
  manage () {
    this.nav.push(ProjectDetailManagementPage, {assignment: this.assignment});
  }
}

@Component({
  templateUrl: 'detail_management.html'
})
export class ProjectDetailManagementPage extends ProjectDetailPage {
  selectable_hours = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  employee_assignments: EmployeeAssignmentList = new EmployeeAssignmentList(undefined);
  constructor(
        nav: NavController,
        params: NavParams
  ) {
    super(nav, params);
    this.employee_assignments.api = this.assignment.api;
    this.employee_assignments.filter({assignment: this.assignment.id});
  }
  ionViewWillEnter () {
    this.assignment.fetch();
    this.employee_assignments.fetch();
  }
  set_hour (ea: EmployeeAssignment, hours) {
    ea.hours = hours;
    ea.update();
  }
  set_overtime (ea: EmployeeAssignment, overtime) {
    ea.overtime = overtime;
    ea.update();
  }
  close () {}
}
