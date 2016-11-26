import { Model, ModelList, APIDateList} from '../../model';
import { Employee, EmployeeList } from '../account/models';

export class Project extends Model{
  fields = ["name"]
  name: string
}

export class Assignment extends Model{
  fields = ["start_datetime", "end_datetime", "number_needed",
    {
      name: "project",
      cls: Project
    },{
      name: "employees",
      cls: EmployeeList
    },{
      name:"availables",
      cls: EmployeeList
    }]
  resource_name = "assignment"
  project: Project
  start_datetime: string
  end_datetime: string
  number_needed: number
  employees: EmployeeList
  availables: EmployeeList

  add(employee: Employee){
    var ea = new EmployeeAssignment(this.api);
    ea.construct({
      assignment: this,
      employee: employee
    });
    ea.commit().subscribe(obj => this.employees.add(employee));
  }
  discard(employee: Employee){
    var ea = new EmployeeAssignment(this.api);
    ea.construct({
      assignment: this,
      employee: employee
    });
    ea.delete();
  }
  is_full(){
    return this.employees.length >= this.number_needed;
  }
  has(employee): boolean{
    return this.employees.has(employee);
  }
}
export class AssignmentDateList extends APIDateList{
  resource_name = "assignment_date"
}

export class AssignmentList extends ModelList<Assignment>{
  resource_name = "assignment"
  model = Assignment
}

export class EmployeeAssignment extends Model{
  resource_name = "employee_assignment"
  fields = [{
    name: "employee",
    cls: Employee
  },{
    name: "assignment",
    cls: Assignment
  }]
}
