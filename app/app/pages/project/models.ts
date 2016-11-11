import { JunctionModel, Model, ModelList } from '../../model';
import { Employee, EmployeeList } from '../account/models';

export class Project extends Model{
  fields = ["name"]
  protected name: string
}

export class Assignment extends Model{
  fields = ["project", "start_datetime", "end_datetime", "number_needed"]
  foreign_fields = {
    project: Project,
    employees: EmployeeList,
    availables: EmployeeList,
  }
  resource_name = "assignment"
  project: Project
  start_datetime: string
  end_datetime: string
  number_needed: number
  employees: EmployeeList
  availables: EmployeeList

  update(){
    this.fetch(this.api);
  }
  add_employee(employee: Employee){
    var ea = new EmployeeAssignment(employee, this, this.api);
    ea.create();
  }
  discard_employee(employee: Employee){
    var ea = new EmployeeAssignment(employee, this, this.api);
    ea.delete();
  }
  is_full(){
    return this.employees.length >= this.number_needed;
  }
}


export class AssignmentList extends ModelList<Assignment>{
  resource_name = "assignment"
  model = Assignment
}

export class EmployeeAssignment extends JunctionModel{
  junction_fields = ["employee", "assignment"]
  constructor(private employee:Employee, private assignment: Assignment, api?){
    super({}, api)
  }
}
