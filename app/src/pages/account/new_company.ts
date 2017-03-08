import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Company } from './models';
import { Api } from '../../providers/api/api';


@Component({templateUrl: 'new_company.html',providers: [Api]})
export class NewCompanyPage {
  title: string;
  company: Company;

  constructor(
    private nav: NavController,
    private api: Api
  ) {
    this.title = '公司資料-新增公司';
    this.company = new Company(api);
  }

  new_company () {
    this.company.create().then(() => {
        this.nav.pop();
    }).catch(() => {
      alert('error');
    });
  }
}
