import { Model, ModelList, JunctionModel } from '../../model';
import { Employee, EmployeeList } from '../account/models';

export class Debt extends Model {
  resource_name = 'debt';
  fields = [
    'amount', 'sign_records', 'modify_time', 'happened_date',
    {
      name: 'employee',
      cls: Employee
    }
  ];
  amount: number;
  sign_records: any;
  modify_time: string;
  employee: Employee;
}

export class DebtList extends ModelList<Debt> {
  resource_name = 'debt';
  model = Debt;
}

export class MyDebtList extends DebtList {
  employee: Employee;
  set_employee (employee: Employee) {
    this.employee = employee;
  }
  buildUrlParams () {
    var params = super.buildUrlParams();
    params['employee'] = this.employee.id;
    return params;
  }
}

export class Paycheck extends Model {
  resource_name = 'paycheck';
  fields = [
    'amount', 'sign_records', 'happened_date',
    {
      name: 'employee',
      cls: Employee
    }
  ];
  amount: number;
  sign_records: any;
  employee: Employee;
}

export class PaycheckList extends ModelList<Debt> {
  resource_name = 'paycheck';
  model = Paycheck;
}

export class MyPaycheck extends JunctionModel {
  resource_name = 'paycheck';
  junction_fields = ['employee'];
  fields = [
    'amount', 'sign_records', 'happened_date',
    {
      name: 'employee',
      cls: Employee,
      is_url: true
    }
  ];
  amount: number;
  sign_records: any;
  employee: Employee;
  send_data(employee: Employee, amount: number) {
    return new Promise<any>(function (resolve, reject){
      var paycheck_data = new Paycheck(this.api);
      paycheck_data.construct({
        amount: amount,
        employee: employee,
      });
      paycheck_data.fetch().then(
        () => {
          paycheck_data.create().then(() => {
            this.fetch();
          });
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
