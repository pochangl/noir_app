import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {PaycheckEmployeesPage} from '../transaction/paycheck_employees';

@Component({
  templateUrl: 'build/pages/transaction/paycheck_choose_service.html',
  providers: [Api]
})

export class PaycheckChooseServicePage {
  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
  }
  work_hour_record () {
    this.nav.push(PaycheckEmployeesPage);
  }
  payment_record () {
    this.nav.push(PaycheckEmployeesPage);
  }
}
