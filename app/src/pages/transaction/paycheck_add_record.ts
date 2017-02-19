import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {MyPaycheck} from './models';

@Component({
  templateUrl: 'paycheck_add_record.html',
  providers: [Api]
})
export class WageAddRecordPage {
  title: '工資';
  paycheck: MyPaycheck;
  employee: any;
  amount: number;
  happened_date: string;
  normal_work_hour: number;
  overtime_work_hour: number;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.normal_work_hour = 0;  // 設定初始值為0.
    this.overtime_work_hour = 0;  // 設定初始值為0.
    this.amount = 0;  // 設定初始值為0.
    this.paycheck = new MyPaycheck(this.api);
    // this.paycheck.id = params.data.paychecks.objects[0].id;
    this.employee = params.data.employee;
    this.paycheck.employee = this.employee;
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
      this.paycheck.send_data(this.employee);
      // this.nav.push(WageEmployeesPage);
    }
  }
}
