import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {PickDatePage} from '../project/pick_date';
import {AddAssignmentPage} from './add_assignment';

@Component({templateUrl: 'project_choose_service.html',providers: [Api]})
export class ProjectChooseServicePage {
  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
  }
  actual_assignment () {
    this.nav.push(PickDatePage);
  }
  add_assignment () {
    this.nav.push(AddAssignmentPage);
  }
}
