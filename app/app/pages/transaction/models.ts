import { Model, ModelList, JunctionModel } from '../../model';
import { Employee, EmployeeList } from '../account/models';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

// export class Paycheck extends JunctionModel {
export class Paycheck extends Model {
  resource_name = 'paycheck';
  // junction_fields = ['employee'];
  fields = [
    'amount', 'sign_records', 'happened_date', 'reason_code', 'reason',
    'signature', 'normal_work_hour', 'overtime_work_hour',
    {
      name: 'employee',
      cls: Employee
    }
  ];
  // fields = [
  //   'amount', 'sign_records', 'happened_date', 'reason_code', 'reason',
  //   'signature',
  //   {
  //     name: 'employee',
  //     cls: Employee,
  //     is_url: true
  //   }
  // ];
  amount: number;
  sign_records: any;
  employee: Employee;
  reason_code: string;
  reason: string;
  signature: any;
  normal_work_hour: number;
  overtime_work_hour: number;
}

export class PaycheckList extends ModelList<Paycheck> {
  resource_name = 'paycheck';
  model = Paycheck;
}

export class MyPaycheck extends Paycheck {

  set_employee(employee: Employee) {
    this.employee = employee;
  }
  send_data(employee: Employee) {
    return new Promise<any>((resolve, reject) => {
      var paycheck_data = new Paycheck(this.api);
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
