import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {PersonalAccountBalnaceList} from './models';

@Component({templateUrl: 'settling_accounts_page.html',providers: [Api]})
export class SettlingAccountsPage {
  personal_account_balances: PersonalAccountBalnaceList;
  to_date: string;

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
  settle_accounts(to_date) {
    this.personal_account_balances.settle_account(to_date);
  }
}
