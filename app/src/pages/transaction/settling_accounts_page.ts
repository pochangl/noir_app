import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {BaseAccountBalance} from './models';

@Component({templateUrl: 'settling_accounts_page.html',providers: [Api]})
export class SettlingAccountsPage {
  base_account_balances: BaseAccountBalance;
  select_settle_date: string;
  today: string = new Date().toISOString();

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.base_account_balances = new BaseAccountBalance(this.api);
  }
  ionViewWillEnter () {
    this.base_account_balances.fetch();
  }
  settle_all_records() {
    if (this.select_settle_date > this.today) {
      alert('關帳日不可大於今日.')
    }
    this.base_account_balances.settle_all_records(this.select_settle_date);
  }
}
