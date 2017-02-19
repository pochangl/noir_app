import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
// import {Paycheck} from './models';

@Component({
  templateUrl: 'paycheck_detail.html',
  providers: [Api]
})
export class PaycheckDetailPage {
  title: '工資';
  // paycheck: Paycheck;

  constructor(
    private nav: NavController,
    params: NavParams
  ) {
    // this.paycheck = params.data.paycheck;
  }
  ionViewWillEnter () {
    // this.paycheck.fetch();
  }
}
