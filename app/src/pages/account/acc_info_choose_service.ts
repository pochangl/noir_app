import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {AccInfoEmplyeesPage} from './acc_info_employees';
import {AccInfoCompaniesPage} from './acc_info_companies';

@Component({templateUrl: 'acc_info_choose_service.html',providers: [Api]})
export class AccInfoChooseServicePage {
  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
  }
  personal_info () {
    this.nav.push(AccInfoEmplyeesPage);
  }
  company_info () {
    this.nav.push(AccInfoCompaniesPage);
  }
}
