import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Headers} from '@angular/http';
import {Api} from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {PaycheckEmployeesPage} from '../transaction/paycheck_employees';
import {Paycheck} from './models';

@Component({
  templateUrl: 'build/pages/transaction/paycheck_add_record.html',
  providers: [Api]
})

export class PaycheckAddRecordPage {
  title: '工資';
  paycheck: Paycheck;
  employee: any;
  amount: number;
  happened_date: string;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.paycheck = new Paycheck(this.api);
    console.log(this.paycheck);
    this.employee = params.data.employee;
    // var today = new Date();
    // this.happened_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }
  ionViewWillEnter () {
    this.paycheck.fetch();
  }
  submit () {
    // var paycheck = {
    //   'resource_name': 'paycheck',
    //   'employee': {'resource_name': 'employee', 'contact': {'resource_name': 'contact', 'id': this.employee.contact.id, 'name': this.employee.contact.name, 'fields': [], 'is_removed': false, 'id_alias': 'id', 'api':''}, 'id': this.employee.id, 'fields': []},
    //   'fields': [],
    //   'id': 0,
    //   'amount': this.amount,
    //   'happened_date': this.happened_date,
    //   'sign_records': 0
    // };
    if (this.amount === undefined || this.amount <= 0) {
      alert('金額錯誤！');
      return;
    } else {
      this.paycheck.send_data(this.employee, this.amount);
      // this.nav.push(PaycheckEmployeesPage);
    }
  }
}