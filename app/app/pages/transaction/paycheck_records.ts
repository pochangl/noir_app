import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers } from '@angular/http';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {PaycheckDetailPage} from '../transaction/paycheck_detail';
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
