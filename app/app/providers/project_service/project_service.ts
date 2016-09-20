import { Component, Injectable } from '@angular/core';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {HTTP_PROVIDERS, Response, Headers, RequestOptions} from "@angular/http";

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/



@Injectable()
export class Project_Service {
  assignment: Object;
  employee_projects: any;
  //employee: Object;
  project: Object;

  constructor(private http: Api) {
    //this.employee_projects = [];
  }

  getEmployeeProject() {
    return this.http.get({
      resource_name: "employee_project"
    }).map((res:Response) => res.json());
  }

  //case 3: input assignment, project and employee
  assign_employee_project(
    assignment: Object,
    employee: Object,
    project: Object
  ) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(assignment);
    return this.http.put({
      resource_name: "assignment",
      urlParams: {employee: employee},
      urlParams2: {project: project}
      },
      body,
      headers
    ).map(res => res.json()
    ).subscribe( data => {
  		assignment = data;
    });
  }

  unassign_employee_project() {}

  //input project & employee, and output employee_project
//  find_employee_project(employee_project: Object, employee: Object, project: Object, options?: any) {
//    function filter_employee_project(obj) {
//      if (obj.id !== undefined && typeof(obj.id) === 'number' && !isNaN(obj.id) && obj.id === employee.id) {
//        return true;
//      } else {
//        return false;
//      }
//    }
//    var filterd_employee_project = employee_project.map(res.json => res()).filter(filter_employee_project);

//    return this.http.get({
//      resource_name: "employee_project",
//      urlParams: {employee: employee},
//      urlParams2: {project: project}
//    }).map(res => res.json()
//    ).subscribe( data => {
//      this.employee_projects = data.objects;
//    });
//不可使用http調用同步行為
//    return this.employee_projects;
//  }


  //  case 1: input assignment
  //  assign_employee_project(assignment: Object, options?: any) {
  //    console.log(assignment);
  //    for(var pk in assignment) {
  //      return this.http.put({resource_name: "assignment", id: assignment[pk].pk}, assignment
  //                            ).map(res => res.json()
  //                            ).subscribe( data => {
  //                              assignment[pk].selected = data.selected;
  //                            });
  //    }
  //}

//  unassign_employee_project(assignment: Object, options?: any) {
//    for(var key in assignment) {
//      console.log(assignment[key]);
//      return this.http.put({resource_name: "assignment", id: assignment[key].id}, assignment
//                            ).map(res => res.json()
//                            ).subscribe( data => {
//                              assignment[key].selected = data.selected;
//                            });
//    }
//  }
}
