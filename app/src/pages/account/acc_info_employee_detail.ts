import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Employee } from './models';
import { Api } from '../../providers/api/api';


@Component({templateUrl: 'acc_info_employee_detail.html',providers: [Api]})
export class AccInfoEmplyeeDetailPage {
  title: string;
  employee: Employee;

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.title = '個人資料-編輯員工資料';
    this.employee = params.data.employee;
  }
  ionViewWillEnter () {
    this.employee.fetch();
  }

  click () {
  }
}
