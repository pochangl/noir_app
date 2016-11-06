import { Model, ModelList } from '../../model';
import { Employee } from '../account/models';

export class Project extends Model{
  protected name: string
  construct(obj: any){
    this.name = obj.name;
  }
  fetch(){}
}

export class Assignment extends Model{
  resource_name = "assignment"
  project: Project
  start_datetime: string
  end_datetime: string
  number_needed: number
  employees: Array<Employee>
  availables: Array<Employee>

  construct(obj: any){
    this.project = new Project(obj.project)
    this.start_datetime = obj.start_datetime
    this.end_datetime = obj.end_datetime
    this.number_needed = obj.number_needed
    this.employees = obj.employees.map(employee=>new Employee(employee))
    this.availables = obj.availables.map(employee=>new Employee(employee))
  }
  update(){

  }
  add(employee: Employee){
    this.fetch()
  }
  remove(employee: Employee){
  }
  is_full(){
    return this.employees.length >= this.number_needed;
  }
}


export class AssignmentList extends ModelList<Assignment>{
  resource_name = "assignment"
  construct(objs: Array<Object>){
    this.objects = objs.map(
      item => new Assignment(item)
    );
  }
}

export class EmployeeAssignment extends Model{
  constructor(private assignment: Assignment, private employee:Employee){
    super({})
  }
  construct(){}
}
