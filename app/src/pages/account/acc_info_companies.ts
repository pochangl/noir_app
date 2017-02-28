import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { CompanyList } from './models';
import { Api } from '../../providers/api/api';
// import { AccInfoEmplyeeDetailPage } from './acc_info_employee_detail';


@Component({templateUrl: 'acc_info_companies.html',providers: [Api]})
export class AccInfoCompaniesPage {
  title: string;
  companies: CompanyList;

  constructor(
    private nav: NavController,
    private api: Api
  ) {
    this.title = '公司資料-公司清單';
    this.companies = new CompanyList(api);
  }

  ionViewWillEnter () {
    this.companies.fetch();
  }

  click (company) {
    // this.nav.push(AccInfoCompanyDetailPage, {company: company});
  }
}
