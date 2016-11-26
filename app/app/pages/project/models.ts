import { Model, ModelList } from '../../model';
import { Employee, EmployeeList } from '../account/models';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';


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
    ea.commit();
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
  is_selected(){
    return false;
  }
}


export class AssignmentList extends ModelList<Assignment>{
  resource_name = "assignment"
  model = Assignment

  buildUrlParams(rangeOfDateTime){
    // var rangeOfDateTime = [
    //   {"start_datetime__gte": start_date+"T00:00:00"},
    //   {"start_datetime__lte": start_date+"T23:59:59"}
    // ];
    // var buildUrlParam = start_date ? rangeOfDateTime: {};
    return rangeOfDateTime;
  }
  fetch(rangeOfDateTime): Observable<Response>{
    console.log(this.buildUrlParams(rangeOfDateTime));
    var observable = this.api.get({
      resource_name: this.resource_name,
      urlParams: this.buildUrlParams(rangeOfDateTime)
    }).map(
      response => response.json()
    );
    observable.subscribe(
      data => {
        this.construct(data.objects);
      }
    );
    return observable;
  }
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
