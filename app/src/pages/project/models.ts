import { Model, IndirectModelList, ModelList, APIDateList} from '../../model';
import { Employee, EmployeeList, Company } from '../account/models';

export class Project extends Model {
  resource_name = 'project/project';
  company: Company;
  name: string;

  fields = ['name',
    {
      name: 'company',
      cls: Company
    }
  ];
}


export class ProjectList extends ModelList<Project> {
  model = Project;
  resource_name = 'project/project';
}

export class BasicAssignment extends Model {
  resource_name = 'project/assignment';
}

export class ProposedEmployee extends Model {
  proposer: number;
  confirmer: number;
  endorser: number;
  employees: EmployeeList;

  fields = ['proposer', 'confirmer', 'endorse',
    {
      name: 'employees',
      cls: EmployeeList
    }
  ];
}

export class EmployeeAssignment extends Model {
  resource_name = 'project/employee_assignment';
  assignment: number;
  employee: Employee;
  hours: Number;
  overtime: Number;
  work_date: string;

  fields = [
    'hours',
    'overtime',
    'assignment',
    'work_date',
    {
      name: 'employee',
      cls: Employee
    }
  ];
  build_url_obj (): Object {
    let obj = super.build_url_obj();
    obj.urlParams = {
      assignment: this.assignment
    };
    return obj;
  }
}

export class EmployeeAssignmentList extends ModelList<EmployeeAssignment> {
  model = EmployeeAssignment;
  resource_name = 'project/employee_assignment';
}

export class Assignment extends BasicAssignment {
  fields = ['start_datetime', 'end_datetime', 'number_needed',
    {
      name: 'project',
      cls: Project
    }, {
      name: 'employees',
      cls: EmployeeList
    }, {
      name: 'confirms',
      cls: EmployeeList
    }, {
      name: 'proposed',
      cls: ProposedEmployee
    }];
  project: Project;
  start_datetime: string;
  end_datetime: string;
  number_needed: number;
  employees: EmployeeList;
  confirms: EmployeeList;
  proposed: ProposedEmployee;

  add (employee: Employee) {
    let ae = new AssignEmployee(this.api);
    ae.id = this.id;
    ae.assignment = this;
    ae.employee = employee;
    return new Promise<any>((resolve, reject) => {
      ae.create().then(() => {
        this.employees.add(employee);
        this.fetch();
        resolve(ae);
      }).catch(() => {
        reject();
      });
    });
  }

  discard (employee: Employee) {
    let ae = new AssignEmployee(this.api);
    ae.assignment = this;
    ae.employee = employee;
    return new Promise<any>((resolve, reject) => {
      ae.delete().then(() => {
        this.employees.remove(ae);
        this.fetch();
        resolve(ae);
      }).catch(() => {
        reject();
      });
    });
  }
  has (employee): boolean {
    return this.employees.has(employee);
  }
  propose () {
    this.api.post({
      resource_name: 'project/propose_employee',
      id: this.id
    }, this.employees.serialize()).subscribe(this.fetch);
  }
  confirm () {
    this.api.post({
      resource_name: 'project/confirm_employee',
      id: this.proposed.id
    }, {}).subscribe(this.fetch);
  }
  endorse () {
    this.api.post({
      resource_name: 'project/endorse_employee',
      id: this.proposed.id
    }, {}).subscribe(this.fetch);
  }
}

class AssignEmployee extends Assignment {
  resource_name = 'project/assign_employee';
  employee: Employee;
  assignment: Assignment;
  build_url_obj (): Object {
    return {
      resource_name: this.resource_name,
      id: this.assignment.id + '/' + this.employee.id
    };
  }
}

export class AssignmentDateList extends APIDateList {
  resource_name = 'assignment_date';
  add_date (today_date) {
    // 新增assignment的方式待討論
  }
}

export class AssignmentList extends ModelList<Assignment> {
  resource_name = 'project/assignment';
  model = Assignment;
}

export class AvailableEmployeeList extends IndirectModelList<Assignment> {
  model = Employee;
  resource_name = 'project/available_employee';
}
