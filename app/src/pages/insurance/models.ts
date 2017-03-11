import { Model, ModelList } from '../../model'
import { Employee as BaseEmployee } from '../account/models'

export class Employee extends BaseEmployee {
    is_insuranced: Boolean = false
}

export class Insurance extends Model {
  resource_name = 'insurance'
  date: string;
  employee: Employee;
  is_insuranced = true;
  _action: string;

  fields =  [
    'date',
    'action',
    'create_time',
    {
      name: 'employee',
      cls: Employee
    }
  ]
  get action () {
    switch (this._action) {
      case 'add':
        return '加保';
      case 'remove':
        return '退保'
      default:
        return '未知動作'
    }
  }
  set action (value) {
    this._action = value
  }
  serializeEmployee () {
    let obj:any = this.employee.serialize();
    obj.date = this.date;
    return obj
  }
  add () {
      return new Promise((resolve, reject) => {
        this.api.post({
            resource_name: 'insurance/add'
        }, this.serializeEmployee()).subscribe(()=>{
          resolve(true)
        });
      });
  }
  remove () {
    return new Promise((resolve, reject) => {
      this.api.post({
          resource_name: 'insurance/remove'
      }, this.serializeEmployee()).subscribe(()=>{
        resolve(true)
      });
    });
  }
}

export class InsuranceList extends ModelList<Insurance> {
  model = Insurance;
  resource_name = 'insurance/recent'
}

export class InsuranceEmployeeList extends ModelList<Insurance> {
  model = Employee;
  resource_name = 'insurance/employees'
}

export class ActiveWorkerList extends ModelList<Employee> {
  /*
    not compatible with ActiveWorkerList in project/models.ts
  */
  resource_name = 'project/employee/active';
  model = Employee;
}
