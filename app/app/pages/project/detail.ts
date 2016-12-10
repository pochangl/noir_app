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
  toggle(employee) {
    if (this.assignment.has(employee)) {
      this.assignment.discard(employee);
    } else  if (this.assignment.is_full()) {
      alert('派工人數已達上限！');
      this.assignment.fetch();
    } else {
      this.assignment.add(employee);
    }
  }
}
