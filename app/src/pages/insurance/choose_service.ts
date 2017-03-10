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
    this.nav.push(PickDatePage);
  }
  records () {
    this.nav.push(InsuranceDateRangePage);
  }
}
