import { Model, ModelList, JunctionModel, APIDateList} from '../../model';
import { Employee, EmployeeList } from '../account/models';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';


export class Project extends Model {
  fields = ['name'];
  name: string;
}

class SelectedEmployee extends Employee {
  selected: boolean = false;
  is_confirmed: boolean = false;
}
class SelectedEmployeeList extends ModelList<SelectedEmployee> {
  model = SelectedEmployee;
}

export class Assignment extends Model {
  fields = ['start_datetime', 'end_datetime', 'number_needed',
    {
      name: 'project',
      cls: Project
    }, {
      name: 'employees',
      cls: SelectedEmployeeList
    }, {
      name: 'availables',
      cls: SelectedEmployeeList
    }, {
      name: 'confirms',
      cls: SelectedEmployeeList
    }];
  resource_name = 'assignment';
  project: Project;
  start_datetime: string;
  end_datetime: string;
  number_needed: number;
  employees: SelectedEmployeeList;
  availables: SelectedEmployeeList;
  confirms: SelectedEmployeeList;

  construct (obj?: any) {
    super.construct(obj);
    for (let employee of this.availables.objects) {
      employee.selected = this.has(employee);
    }
    for (let employee of this.employees.objects) {
      employee.is_confirmed = this.confirms.has(employee);
    }
    return this;
  }

  add (employee: SelectedEmployee) {
    var ea = new EmployeeAssignment(this.api);
    ea.construct({
      assignment: this,
      employee: employee
    });
    ea.commit().then(
      obj => {
        this.employees.add(employee);
        this.fetch();
      }
    );
  }

  discard (employee: SelectedEmployee) {
    var ea = new EmployeeAssignment(this.api);
    ea.construct({
      assignment: this,
      employee: employee
    });
    ea.fetch().then(
      () => {
        ea.delete();
        this.fetch();
      }).catch(() => {
        this.fetch();
      }
    );
    this.employees.remove(employee);
  }

  confirm (employee: SelectedEmployee) {
    employee.is_confirmed = true;
    var ea = new EmployeeAssignment(this.api);
    ea.construct({
      assignment: this,
      employee: employee,
      is_confirmed: true
    });
    ea.fetch().then(
      () => {
        ea.update().then(() => {
          this.fetch();
        });
      }
    );
    this.confirms.add(employee);
  }

  unconfirm (employee: SelectedEmployee) {
    employee.is_confirmed = false;
    var ea = new EmployeeAssignment(this.api);
    ea.construct({
      assignment: this,
      employee: employee,
      is_confirmed: false
    });
    ea.fetch().then(
      () => {
        ea.update().then(() => {
          this.fetch();
        });
      }).catch(() => {
        ea.update().then(() => {
          this.fetch();
        });
      }
    );
    this.confirms.remove(employee);
  }
  is_full () {
    return this.employees.objects.length >= this.number_needed;
  }
  has (employee): boolean {
    return this.employees.has(employee);
  }
}
export class AssignmentDateList extends APIDateList {
  resource_name = 'assignment_date';
}

export class AssignmentList extends ModelList<Assignment> {
  resource_name = 'assignment';
  model = Assignment;
}

export class EmployeeAssignment extends JunctionModel {
  assignment: Assignment;
  employee: Employee;
  resource_name = 'employee_assignment';
  junction_fields = ['employee', 'assignment'];
  fields = [
    'is_confirmed',
    {
      name: 'employee',
      cls: Employee,
      is_url: true
    }, {
      name: 'assignment',
      cls: Assignment,
      is_url: true
    }
  ];
}
