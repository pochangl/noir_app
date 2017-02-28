import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjectListPage } from '../project/list';
import { Api } from '../../providers/api/api';
import { InsuranceList, Insurance, Employee } from './models';

@Component({templateUrl: 'list.html', providers: [Api]})
export class InsuranceListPage extends ProjectListPage {
    insurances: InsuranceList;
    employees: Array<Employee>;
    insureds: any;
    date: any;

    constructor(
        protected nav: NavController,
        protected params: NavParams,
        protected api: Api
    ) {
        super(nav, params, api);
        this.insurances = new InsuranceList(api);
        this.date = params.get('date').date;
        this.assignments.filter({
          date: this.date
        });
        this.insurances.filter({
          date: this.date
        });
    }
    ionViewWillEnter () {
      this.refresh();
    }
    refresh () {
      this.assignments.fetch().then(() => {
        this.valueUpdated();
      });
      this.insurances.fetch().then(() => {
        this.valueUpdated();
      });
    }
    valueUpdated () {
      let employees = []
      this.insureds = {};
      for (let insurance of this.insurances.objects) {
        this.registerInsurance(insurance);
      }
      for (let assignment of this.assignments.objects) {
        employees.concat(assignment.employees.objects);
      }
      this.employees = employees
    }
    registerInsurance (insurance) {
      this.insureds[insurance.employee.id] = insurance;
    }
    insuranceUpdate (employee) {
      if (employee.id in this.insureds) {
        this.insureds[employee.id].delete(() => {
          this.valueUpdated();
        })
      } else {
        let insurance = new Insurance(this.api);
        insurance.employee = employee;
        insurance.date = this.date;
        insurance.create().then(() => {
          this.valueUpdated();
          this.registerInsurance(insurance);
        })
      }
    }
}
