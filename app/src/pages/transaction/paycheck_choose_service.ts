import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {WorkHourDateRangePage} from './work_hour_date_range';
import {WageDateRangePage} from './wage_date_range';

@Component({
  templateUrl: 'paycheck_choose_service.html',
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
    this.nav.push(WorkHourDateRangePage);
  }
  payment_record () {
    this.nav.push(WageDateRangePage);
  }
}
