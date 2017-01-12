import { Model, ModelList, JunctionModel } from '../../model';
import { Employee, EmployeeList } from '../account/models';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

export class Paycheck extends Model {
  resource_name = 'paycheck';
  fields = [
    'amount', 'sign_records', 'happened_date', 'reason_code', 'reason',
    'signature',
    {
      name: 'employee',
      cls: Employee
    }
  ];
  amount: number;
  sign_records: any;
  employee: Employee;
  reason_code: string;
  reason: string;
  signature: any;
}

export class PaycheckList extends ModelList<Paycheck> {
  resource_name = 'paycheck';
  model = Paycheck;
}

class SelectedEmployee extends Employee {
  selected: boolean = false;
  is_confirmed: boolean = false;
}
class SelectedEmployeeList extends ModelList<SelectedEmployee> {
  model = SelectedEmployee;
}

export class MyPaycheck extends Paycheck {
  employee: Employee;
  fields = [
    'amount', 'happened_date',
    {
      name: 'employee',
      cls: Employee,
      is_url: true
    }
  ];

  set_employee(employee: Employee) {
    this.employee = employee;
  }
  send_data() {
    return new Promise<any>((resolve, reject) => {
      var paycheck_data = new MyPaycheck(this.api);
      paycheck_data.construct({
        employee: this.employee,
      });
      paycheck_data.commit().then(
        obj => {
          resolve(this.employee);
          this.set_employee(this.employee);
        }
      );
    });
  }
}

export class MyPaycheckList extends PaycheckList {
  employee: Employee;
  set_employee(employee: Employee) {
    this.employee = employee;
  }
  buildUrlParams () {
    var params = super.buildUrlParams();
    params['employee'] = this.employee.id;
    return params;
  }
}
