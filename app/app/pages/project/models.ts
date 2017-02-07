import { Model, ModelList, JunctionModel, APIDateList} from '../../model';
import { Employee, EmployeeList } from '../account/models';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';


export class Project extends Model {
  fields = ['name'];
  name: string;
}

export class BasicAssignment extends Model {
  resource_name = 'assignment';
}

export class EmployeeAssignment extends Model {
  resource_name = 'employee_assignment';
  assignment: Assignment;
  employee: Employee;
  hours: Number;
  overtime: Number;

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
  has_employee (employee: Employee): Boolean {
    return this.has({employee: employee});
  }
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
      cls: EmployeeList
    }, {
      name: 'confirms',
      cls: EmployeeList
    }];
  project: Project;
  start_datetime: string;
  end_datetime: string;
  number_needed: number;
  employee_details: EmployeeAssignmentList;
  availables: EmployeeList;
  confirms: EmployeeList;

  add (employee: Employee) {
    let eas = this.employee_details.find({ employee: employee });
    let ea = eas.length > 0 ? eas[0] : new EmployeeAssignment(this.api);
    ea.employee = employee;
    ea.assignment = this;
    return new Promise<any>((resolve, reject) => {
      ea.create().then(() => {
        this.employee_details.add(ea);
        this.fetch();
        resolve(ea);
      }).catch(() => {
        reject();
      });
    });
  }

  discard (employee: Employee) {
    let ea = this.employee_details.find({employee: employee})[0];
    return new Promise<any>((resolve, reject) => {
      ea.delete().then(() => {
        this.employee_details.remove(ea);
        this.fetch();
        resolve(ea);
      }).catch(() => {
        reject();
      });
    });
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
