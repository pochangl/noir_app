import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {BaseAccountBalance} from './models';
// import {PersonalAccountBalanceList} from './models';

@Component({templateUrl: 'settling_accounts_page.html',providers: [Api]})
export class SettlingAccountsPage {
  // personal_account_balances: PersonalAccountBalanceList;
  base_account_balances: BaseAccountBalance;
  to_date: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    // this.personal_account_balances = new PersonalAccountBalanceList(this.api);
    this.base_account_balances = new BaseAccountBalance(this.api);
  }
  ionViewWillEnter () {
    // this.personal_account_balances.fetch();
    this.base_account_balances.fetch();
  }
  settle_all_records() {
    // this.personal_account_balances[0].settle_all_records();
    this.base_account_balances.settle_all_records();
  }
}
