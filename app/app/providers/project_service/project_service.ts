import { Component, Injectable } from '@angular/core';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/



@Injectable()
export class Project_Service {
  assignment: Object;
  employee_projects: any;

  constructor(private http: Api) {
    this.employee_projects = [];
  }

  //case 3: input assignment, project and employee
  assign_employee_project(assignment: Object, employee: Object, project: Object, options?: any) {
    console.log({employee_project: this.find_employee_project(employee, project)});
    return this.http.put({
      resource_name: "assignment",
      urlParams: {employee_project: this.find_employee_project(employee, project)}
    }, this.assignment
    ).map(res => res.json()
    ).subscribe( data => {
      this.assignment = data.objects;
    });
  }

  unassign_employee_project(employee: Object, project: Object, options?: any) {}

  //input project & employee, and output employee_project
  find_employee_project(employee: Object, project: Object, options?: any) {
    return this.http.get({
      resource_name: "employee_project",
      urlParams: {employee: employee},
      urlParams2: {project: project}
    }).map(res => res.json()
    ).subscribe( data => {
      //console.log(data.objects);
      this.employee_projects = data.objects;
    });
//不可使用http調用同步行為
//    console.log(this.employee_projects);
//    return this.employee_projects;
  }


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
