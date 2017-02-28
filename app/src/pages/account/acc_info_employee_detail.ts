import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Employee, Contact } from './models';
import { Api } from '../../providers/api/api';


@Component({templateUrl: 'acc_info_employee_detail.html',providers: [Api]})
export class AccInfoEmplyeeDetailPage {
  title: string;
  employee: Employee;
  contact: Contact = new Contact(undefined);

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ) {
    this.title = '個人資料-編輯員工資料';
    this.employee = params.data.employee;
    this.contact.api = this.employee.api;
    this.contact.id = this.employee.id;
  }

  ionViewWillEnter () {
    this.employee.fetch();
    this.contact.fetch();
  }

  new_employee () {
    this.contact.add(this.contact);
  }

  modify_acc_info () {
    this.contact.update();
  }

  delete_employee () {
    this.employee.delete();
  }
}
