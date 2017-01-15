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

export class BasicAssignment extends Model {
  resource_name = 'assignment';
}

export class EmployeeAssignment extends JunctionModel {
  assignment: Assignment;
  employee: Employee;
  resource_name = 'employee_assignment';
  junction_fields = ['employee', 'assignment'];
  fields = [
    'hours',
    'overtime',
    {
      name: 'employee',
      cls: Employee,
      is_url: true
    }, {
      name: 'assignment',
      cls: BasicAssignment,
      is_url: true
    }
  ];
}


class EmployeeAssignmentList extends ModelList<EmployeeAssignment> {
  model = EmployeeAssignment;
}


export class Assignment extends BasicAssignment {
  fields = ['start_datetime', 'end_datetime', 'number_needed',
    {
      name: 'project',
      cls: Project
    }, {
      name: 'employee_details',
      cls: EmployeeAssignmentList
    }, {
      name: 'availables',
      cls: SelectedEmployeeList
    }, {
      name: 'confirms',
      cls: SelectedEmployeeList
    }];
  project: Project;
  start_datetime: string;
  end_datetime: string;
  number_needed: number;
  employee_details: EmployeeAssignmentList;
  availables: SelectedEmployeeList;
  confirms: SelectedEmployeeList;

  construct (obj?: any) {
    super.construct(obj);
    for (let employee of this.availables.objects) {
      employee.selected = this.has(employee);
    }
    return this;
  }

  add (employee: SelectedEmployee) {
    return new Promise<any>((resolve, reject) => {
      var ea = new EmployeeAssignment(this.api);
      ea.construct({
        assignment: this,
        employee: employee
      });
      ea.commit().then(
        obj => {
          resolve(this.employee_details);
          this.employee_details.add(ea);
        }
      );
    });
  }

  discard (employee: SelectedEmployee) {
    var ea = new EmployeeAssignment(this.api);
    ea.construct({
      assignment: this,
      employee: employee
    });
    ea.fetch().then(
      () => {
        ea.delete().then(() => {
          this.fetch();
        });
      }).catch(() => {
        this.fetch();
      }
    );
    this.employee_details.remove({employee: employee});
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
    return this.employee_details.objects.length >= this.number_needed;
  }
  has (employee): boolean {
    return this.employee_details.has({employee: employee});
  }
}
export class AssignmentDateList extends APIDateList {
  resource_name = 'assignment_date';
  add_date (today_date) {
    // 新增assignment的方式待討論
  }
}

export class AssignmentList extends ModelList<Assignment> {
  resource_name = 'assignment';
  model = Assignment;
}
