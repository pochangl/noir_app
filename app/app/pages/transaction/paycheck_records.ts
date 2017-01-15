import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {PaycheckDetailPage} from '../transaction/paycheck_detail';
import {PaycheckAddRecordPage} from '../transaction/paycheck_add_record';
import {MyPaycheckList} from './models';
import {Employee} from '../account/models';

@Component({
  templateUrl: 'build/pages/transaction/paycheck_records.html',
  providers: [Api]
})

export class PaycheckRecordsPage {
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
  navToAddRecordPage () {
    this.nav.push(PaycheckAddRecordPage, {employee: this.employee});
  }
}
