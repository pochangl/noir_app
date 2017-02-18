import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {PaycheckDetailPage} from '../transaction/paycheck_detail';
import {MyPaycheckList} from './models';
import {Employee} from '../account/models';

@Component({
  templateUrl: 'build/pages/transaction/work_hour_records.html',
  providers: [Api]
})

export class WorkHourRecordsPage {
  title: '工資';
  paychecks: MyPaycheckList;
  employee: Employee;
  amount: number;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.paychecks = new MyPaycheckList(this.api);
    this.employee = params.data.employee;
    this.paychecks.set_employee(this.employee);
  }
  ionViewWillEnter () {
    this.paychecks.fetch();
  }
  click (paycheck) {
    this.nav.push(PaycheckDetailPage, {paycheck: paycheck});
  }
}
