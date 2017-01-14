import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PickDatePage} from '../project/pick_date';
import {DayOffEmployeesPage} from '../schedule/dayoff_employees';
import {PaycheckEmployeesPage} from '../transaction/paycheck_employees';

@Component({
  templateUrl: 'build/pages/general/home.html',
})

export class HomePage {
  constructor(private nav: NavController) {
  }

  project () {
    this.nav.push(PickDatePage);
  }
  add_policy () {
    // this.nav.push();
  }
  number_needed () {
    // this.nav.push();
  }
  cancle_policy () {
    // this.nav.push();
  }
  dayoff () {
    this.nav.push(DayOffEmployeesPage);
  }
  paycheck () {
    this.nav.push(PaycheckEmployeesPage);
  }
  wages_status () {
    // this.nav.push();
  }
}
