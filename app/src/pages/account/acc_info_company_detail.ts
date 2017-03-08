import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Company } from './models';
import { Api } from '../../providers/api/api';


@Component({templateUrl: 'acc_info_company_detail.html',providers: [Api]})
export class AccInfoCompanyDetailPage {
  title: string;
  company: Company;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.title = '公司資料-編輯公司資料';
    this.company = params.data.company;
  }

  ionViewWillEnter () {
    this.company.fetch();
  }

  modify_acc_info () {
    this.company.update().then(() => {
        this.nav.pop();
    }).catch(() => {
      alert('error');
    });
  }

  delete_company () {
    this.company.delete().then(() => {
        this.nav.pop();
    }).catch(() => {
      alert('error');
    });
  }
}
