import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {InsuranceList} from './models';

@Component({templateUrl: 'insurance_records.html',providers: [Api]})
export class InsuranceRecordsPage {
  insurances: InsuranceList;
  date_from: string;
  date_to: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.date_from = params.data.date_from;
    this.date_to = params.data.date_to;
    this.insurances = new InsuranceList(api);
    this.insurances.filter({
      start_datetime: this.date_from,
      end_datetime: this.date_to
    });
  }
  ionViewWillEnter () {
    this.insurances.fetch();
  }
  // click (personal_account_balance) {
  // }
}
