import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Headers} from '@angular/http';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {HomePage} from '../general/home';
import {Debt} from './models';

@Component({
  templateUrl: 'build/pages/transaction/debt_detail.html',
  providers: [Api]
})

export class DebtDetailPage {
  title: '工資';
  debt: Debt;

  constructor(
    private nav: NavController,
    params: NavParams
  ) {
    this.debt = params.data.debt;
  }
  ionViewWillEnter () {
    this.debt.fetch();
  }
  submit () {
    if (this.debt.amount === undefined) {
      alert('not ready');
      return;
    } else {
      this.debt.commit();
      this.nav.push(HomePage);
    }
  }
}
