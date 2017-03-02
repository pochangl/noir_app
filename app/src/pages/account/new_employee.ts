import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Employee, Contact } from './models';
import { Api } from '../../providers/api/api';


@Component({templateUrl: 'new_employee.html',providers: [Api]})
export class NewEmployeePage {
  title: string;
  contact: Contact;
  employee: Employee;

  constructor(
    private nav: NavController,
    private api: Api
  ) {
    this.title = '個人資料-新增員工';
    this.contact = new Contact(api);
    this.employee = new Employee(api);
  }

  new_contact () {
    this.contact.create().then(() => {
      this.employee.create().then(() => {

      }).catch(() => {
        
      });
    }).catch(() => {
    });
  }
}
