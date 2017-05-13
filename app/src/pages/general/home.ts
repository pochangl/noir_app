import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {ProjectChooseServicePage} from '../project/project_choose_service';
import {DayOffEmployeesPage} from '../schedule/dayoff_employees';
import {PaycheckChooseServicePage} from '../transaction/paycheck_choose_service';
import {InsuranceChooseServicePage} from '../insurance/choose_service';
import {AccInfoChooseServicePage} from '../account/acc_info_choose_service';
import {LoginPage} from './login';
import {Auth} from './models';


@Component({templateUrl: 'home.html', selector: 'page-home', providers: [Api]})
export class HomePage {
  username = '';
  email = '';
  user_info: Auth;

  constructor(
    protected nav: NavController,
    params: NavParams,
    protected api: Api
  ) {
    this.user_info = new Auth(this.api);
    this.username = params.data.username;
    console.log(params.data);
  }

  project () {
    this.nav.push(ProjectChooseServicePage);
  }
  insurance () {
    this.nav.push(InsuranceChooseServicePage);
  }
  paycheck () {
    this.nav.push(PaycheckChooseServicePage);
  }
  dayoff () {
    this.nav.push(DayOffEmployeesPage);
  }
  acc_info () {
    this.nav.push(AccInfoChooseServicePage);
  }

  public logout() {
    // this.user_info.logout_user().then(() => {
    //   this.nav.setRoot(LoginPage);
    // })
    this.nav.setRoot(LoginPage);
  }
}
