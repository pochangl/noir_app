import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {PersonalAccountBalanceList} from './models';
import {Employee} from '../account/models';

@Component({templateUrl: 'wage_employees.html',providers: [Api]})
export class WageEmployeesPage {
  personal_account_balances: PersonalAccountBalanceList;
  employee: Employee;
  employee_name: string;
  date_from: string;
  date_to: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.employee = params.data.employee;
    this.date_from = params.data.date_from;
    this.date_to = params.data.date_to;
    this.employee_name = this.employee.contact.name;
    this.personal_account_balances = new PersonalAccountBalanceList(api);
    this.personal_account_balances.filter({
      employee: this.employee.id,
      date_from: this.date_from,
      date_to: this.date_to
    });
  }
  ionViewWillEnter () {
    this.employee.fetch();
    this.personal_account_balances.fetch();
  }
  click (personal_account_balance) {
  }
}
