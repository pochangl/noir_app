import { Model } from '../../model';
import { Employee } from '../account/models';


export class Project extends Model{
  id: number
  protected name: string
  constructor(obj: any){
    super(obj)
    name = obj.name
  }
  construct(obj: any){
    name = obj.name
  }
  fetch(){}
}

export class Assignment extends Model{
  project: Project
  start_datetime: string
  end_datetime: string
  number_needed: number
  employees: Array<Employee>
  availables: Array<Employee>
  constructor(obj: any){
    super(obj)
    this.construct(obj)
  }
  construct(obj: any){
    this.project = new Project(obj.project)
    this.start_datetime = obj.start_datetime
    this.end_datetime = obj.end_datetime
    this.number_needed = obj.number_needed
    this.employees = obj.employees.map(employee=>new Employee(employee))
    this.availables = obj.availables.map(employee=>new Employee(employee))
  }
  fetch(){
    this.api.get({
      resource_name: "unassigned"
    }).map(
      response => response.json()
    ).subscribe(
      data =>{
        this.construct(data)
      }
    );
  }
  add(employee: Employee){

  }
  remove(employee: Employee){

  }
  is_full(){
    return this.employees.length >= this.number_needed;
  }
}
