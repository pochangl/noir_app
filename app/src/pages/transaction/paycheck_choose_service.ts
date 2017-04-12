import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {WorkHourDateRangePage} from './work_hour_date_range';
import {WageDateRangePage} from './wage_date_range';
import {SettlingAccountsPage} from './settling_accounts_page';
import {PersonalAccountBalnaceList} from './models';

@Component({templateUrl: 'paycheck_choose_service.html',providers: [Api]})
export class PaycheckChooseServicePage {
  personal_account_balances: PersonalAccountBalnaceList;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.personal_account_balances = new PersonalAccountBalnaceList(this.api);
  }
  ionViewWillEnter () {
    this.personal_account_balances.fetch();
  }
  work_hour_record () {
    this.nav.push(WorkHourDateRangePage);
  }
  payment_record () {
    this.nav.push(WageDateRangePage);
  }
  settling_accounts () {
    this.nav.push(SettlingAccountsPage);
  }
}
