import { Model, ModelList } from '../../model'
import { Employee as BaseEmployee } from '../account/models'

export class Employee extends BaseEmployee {
    is_insuranced: Boolean = false
}

class InsurancedEmployee extends Employee {
  is_insuranced: Boolean = true
}

export class Insurance extends Model {
  resource_name = 'insurance'
  date: string;
  employee: Employee;
  is_insuranced = true;
  action = 'None'

  fields =  [
    'date',
    'action',
    'create_time',
    {
      name: 'employee',
      cls: Employee
    }
  ]
  get action_literal () {
    switch (this.action) {
      case 'add':
        return '加保';
      case 'remove':
        return '退保'
      default:
        return '未知動作'
    }
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
  model = InsurancedEmployee;
  resource_name = 'insurance/employees'
}

export class ActiveWorkerList extends ModelList<Employee> {
  /*
    not compatible with ActiveWorkerList in project/models.ts
  */
  resource_name = 'project/employee/active';
  model = Employee;
}
