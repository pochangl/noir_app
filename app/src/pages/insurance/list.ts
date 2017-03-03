import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { InsuranceEmployeeList, Insurance, ActiveWorkerList} from './models';

@Component({templateUrl: 'list.html', providers: [Api]})
export class InsuranceListPage {
    insuranced_employees: InsuranceEmployeeList;
    employees: ActiveWorkerList;
    still_insuranced_employees: Array<Insurance>
    date: any;

    constructor(
        protected nav: NavController,
        protected params: NavParams,
        protected api: Api
    ) {
        this.date = params.get('date').date
        this.employees = new ActiveWorkerList(api);
        this.insuranced_employees = new InsuranceEmployeeList(api);
        this.employees.filter({
          date: this.date
        });
        this.insuranced_employees.filter({
          date: this.date
        });
    }
    ionViewWillEnter () {
      this.refresh();
    }
    refresh () {
      this.insuranced_employees.fetch().then(
        () => {
          this.employees.fetch().then(() => this.update());
        }
      );
    }
    update () {
      this.employees.objects.map(employee => {
        employee.is_insuranced = false;
      });
      this.still_insuranced_employees = [];
      this.insuranced_employees.objects.map(insurance => {
        let results = this.employees.find(insurance);
        if (results.length) {
          results[0].is_insuranced = true;
        } else {
          this.still_insuranced_employees.push(insurance);
        }
      });
    }
    insuranceUpdate (employee, value) {
      let insurance = new Insurance(this.api);
      insurance.date = this.date;
      if (value) {
        insurance.employee = employee;
        this.insuranced_employees.add(employee);
        insurance.add().then(() => this.refresh());
      } else {
        insurance.employee = employee;
        this.insuranced_employees.remove(employee);
        insurance.remove().then(() => this.refresh());
      }
    }
}
