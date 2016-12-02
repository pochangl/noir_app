import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers } from '@angular/http';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import { HomePage } from '../general/home';
import {Paycheck} from './models';

@Component({
  templateUrl: 'build/pages/transaction/paycheck_detail.html',
  providers: [Api]
})

export class PaycheckDetailPage {
  title: '工資';
  paycheck: Paycheck;

  constructor(
    private nav: NavController,
    params: NavParams
  ) {
    this.paycheck = params.data.paycheck;
  }
  ionViewWillEnter () {
    this.paycheck.fetch();
  }
  submit () {
    if (this.paycheck.amount === undefined) {
      alert('not ready');
      return;
    } else {
      this.paycheck.commit();
      this.nav.push(HomePage);
    }
  }
}
