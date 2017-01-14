import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PickDatePage} from '../project/pick_date';
import {DayOffEmployeesPage} from '../schedule/dayoff_employees';
import {PaycheckEmployeesPage} from '../transaction/paycheck_employees';
import {ChooseServicePage} from '../transaction/transaction_choose_service';
import {WagesStatusPage} from '../transaction/transaction_wages_status';

@Component({
  templateUrl: 'build/pages/general/home.html',
})

export class HomePage {
  constructor(private nav: NavController) {
  }

  project () {
    this.nav.push(PickDatePage);
  }
  insurance () {
    this.nav.push(ChooseServicePage);
  }
  dayoff () {
    this.nav.push(DayOffEmployeesPage);
  }
  paycheck () {
    this.nav.push(PaycheckEmployeesPage);
  }
  wages_status () {
    this.nav.push(WagesStatusPage);
  }
}
