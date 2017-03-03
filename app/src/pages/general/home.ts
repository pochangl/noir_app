import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProjectChooseServicePage} from '../project/project_choose_service';
import {DayOffEmployeesPage} from '../schedule/dayoff_employees';
import {PaycheckChooseServicePage} from '../transaction/paycheck_choose_service';
import {InsuranceChooseServicePage} from '../insurance/choose_service';
import {AccInfoChooseServicePage} from '../account/acc_info_choose_service';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from './login';

@Component({templateUrl: 'home.html', selector: 'page-home'})
export class HomePage {
  username = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthService) {
    let info = this.auth.getUserInfo();
    this.username = info.name;
    this.email = info.email;
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
    this.auth.logout().subscribe(succ => {
        this.nav.setRoot(LoginPage)
    });
  }
}
