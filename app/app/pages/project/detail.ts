import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { SelectedPipe } from '../pipes/selected_account';
import { Assignment } from './models';

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
  constructor(
        nav: NavController,
        params: NavParams
  ) {
    super(nav, params);
  }
  toggle (employee) {
    if (this.assignment.confirms.has(employee)) {
      this.assignment.unconfirm(employee);
    } else {
      this.assignment.confirm(employee);
    }
  }
}
