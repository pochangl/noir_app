import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
// import {BaseAccountBalance} from './models';
import {PersonalAccountBalanceList} from './models';

@Component({templateUrl: 'settling_accounts_page.html',providers: [Api]})
export class SettlingAccountsPage {
  personal_account_balances: PersonalAccountBalanceList;
  // base_account_balances: BaseAccountBalance;
  from_date: string;
  to_date: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.personal_account_balances = new PersonalAccountBalanceList(this.api);
    // this.base_account_balances = new BaseAccountBalance(this.api);
  }
  ionViewWillEnter () {
    this.personal_account_balances.fetch();
    // this.base_account_balances.fetch();
  }
  settle_all_records(from_date, to_date) {
    this.personal_account_balances.settle_all_records(from_date, to_date);
    // this.base_account_balances.settle_all_records(from_date, to_date);
  }
}
