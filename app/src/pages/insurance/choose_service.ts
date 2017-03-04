import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { PickDatePage } from './pick_date';
import { InsuranceDateRangePage} from './records_date_range';

@Component({templateUrl: 'choose_service.html',providers: [Api]})
export class InsuranceChooseServicePage {
  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
) {
  }
  manage_insurance () {
    this.add_policy()
  }
  add_policy () {
    this.nav.push(PickDatePage, {service_choice: 'add_policy'});
  }
  delete_policy () {
    this.nav.push(PickDatePage, {service_choice: 'delete_policy'});
  }
  records () {
    this.nav.push(InsuranceDateRangePage);
  }
}
