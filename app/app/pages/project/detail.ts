import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { SelectedPipe } from '../pipes/selected_account';
import { Assignment, EmployeeAssignment } from './models';

@Component({
  templateUrl: 'build/pages/project/detail.html',
  pipes: [SelectedPipe]
})
export class ProjectDetailPage {
  assignment: Assignment;
  selected_date: string;

  constructor(
        private nav: NavController,
        params: NavParams
  ) {
    this.assignment = params.data.assignment;
    this.selected_date = params.data.assignment.start_datetime.split('T')[0];
  }
  ionViewWillEnter () {
    this.assignment.fetch();
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
  templateUrl: 'build/pages/project/detail_management.html'
})
export class ProjectDetailManagementPage extends ProjectDetailPage {
  selectable_hours = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  constructor(
        nav: NavController,
        params: NavParams
  ) {
    super(nav, params);
  }
  hour (ea: EmployeeAssignment, hours) {
    ea.hours = hours;
    ea.update();
  }
  set_overtime (ea: EmployeeAssignment, overtime) {
    ea.overtime = overtime;
    ea.update();
  }
  close () {}
}
