import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProjectChooseServicePage} from '../project/project_choose_service';
import {DayOffEmployeesPage} from '../schedule/dayoff_employees';
import {PaycheckChooseServicePage} from '../transaction/paycheck_choose_service';
import {InsuranceChooseServicePage} from '../transaction/insurance_choose_service';

@Component({
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(private nav: NavController) {
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
}
