import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {Employee} from '../account/models';

@Component({templateUrl: 'work_hour_records.html',providers: [Api]})
export class WorkHourRecordsPage {
  title: '工資';
  // paychecks: MyPaycheckList;
  employee: Employee;
  amount: number;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    // this.paychecks = new MyPaycheckList(this.api);
    // this.employee = params.data.employee;
    // this.paychecks.set_employee(this.employee);
  }
  ionViewWillEnter () {
    // this.paychecks.fetch();
  }
  // click (paycheck) {
  //   this.nav.push(PaycheckDetailPage, {paycheck: paycheck});
  // }
}
