import { Model, ModelList } from '../../model';
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

export class PaycheckList extends ModelList<Debt> {
  resource_name = 'paycheck';
  model = Paycheck;
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
