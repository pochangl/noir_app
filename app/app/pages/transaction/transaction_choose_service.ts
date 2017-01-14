import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {PickDatePage} from '../transaction/pick_date';

@Component({
  templateUrl: 'build/pages/transaction/transaction_choose_service.html',
  providers: [Api]
})

export class ChooseServicePage {
  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
  }
  add_policy () {
    this.nav.push(PickDatePage, {service_choice: 'add_policy'});
  }
  delete_policy () {
    this.nav.push(PickDatePage, {service_choice: 'delete_policy'});
  }
}
