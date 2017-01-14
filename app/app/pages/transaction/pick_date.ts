import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { ProjectListPage } from './list';
import { HomePage } from '../general/home';
import { AssignmentDateList } from '../project/models';
import { Api } from '../../providers/api/api';
import { MonthIterator } from '../../utils/calendar';


@Component({
  templateUrl: 'build/pages/transaction/pick_date.html',
  providers: [Api]
})

export class PickDatePage {
  dates: AssignmentDateList;
  service_choice: string;
  title: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.service_choice = params.data.service_choice;
    if (this.service_choice === 'add_policy') {
      this.title = '加保';
    } else if (this.service_choice === 'delete_policy') {
      this.title = '退保';
    };
    this.dates = new AssignmentDateList(api);
  }

  ionViewWillEnter () {
    this.dates.fetch();
  }

  click (date) {
    // 待確認 is_insurance 參數的用法
    // this.nav.push(EmployeeListPage, {service_choice: this.service_choice, 'date': date});
  }
}
