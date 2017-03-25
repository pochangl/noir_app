import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProjectListPage } from './list';
import { AssignmentDateList } from './models';
import { Api } from '../../providers/api/api';


@Component({templateUrl: 'pick_date.html',providers: [Api]})
export class PickDatePage {
  dates: AssignmentDateList;

  constructor(
    protected nav: NavController,
    protected api: Api
  ) {
    this.dates = new AssignmentDateList(this.api);
  }

  ionViewWillEnter () {
    this.dates.fetch();
  }

  click (date) {
    this.nav.push(ProjectListPage, {'date': date});
  }
}
