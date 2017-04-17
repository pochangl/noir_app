import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {BaseAccountBalance} from './models';

@Component({templateUrl: 'settling_accounts_page.html',providers: [Api]})
export class SettlingAccountsPage {
  base_account_balances: BaseAccountBalance;
  to_date: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.base_account_balances = new BaseAccountBalance(this.api);
      // var today = new Date();
      // var year = today.getFullYear();
      // var month = today.getMonth() + 1;
  }
  ionViewWillEnter () {
    this.base_account_balances.fetch();
  }
  settle_all_records() {
    this.base_account_balances.settle_all_records();
  }
}
