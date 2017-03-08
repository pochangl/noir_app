import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CompanyList } from './models';
import { Api } from '../../providers/api/api';
import { AccInfoCompanyDetailPage } from './acc_info_company_detail';
import { NewCompanyPage } from './new_company';


@Component({templateUrl: 'acc_info_companies.html',providers: [Api]})
export class AccInfoCompaniesPage {
  title: string;
  companies: CompanyList;

  constructor(
    private nav: NavController,
    private api: Api,
    params: NavParams
  ) {
    this.title = '公司資料-公司清單';
    this.companies = new CompanyList(api);
  }

  ionViewWillEnter () {
    this.companies.fetch();
  }

  new_company () {
    this.nav.push(NewCompanyPage);
  }

  click (company) {
    this.nav.push(AccInfoCompanyDetailPage, {company: company});
  }
}
