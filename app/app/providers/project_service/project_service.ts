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
  constructor(private http: Api) {
  }

  assign_employee_project(assignment: Object, options?: any) {
    console.log(this.assignment);
    for(var pk in assignment) {
      console.log(pk);
      console.log(assignment[pk]);
      return this.http.put({resource_name: "assignment", id: assignment[pk].pk}, assignment
                            ).map(res => res.json()
                            ).subscribe( data => {
                              assignment[pk].selected = data.selected;
                            });
    }
  }

  unassign_employee_project(assignment: Object, options?: any) {
    for(var key in assignment) {
      console.log(assignment[key]);
      return this.http.put({resource_name: "assignment", id: assignment[key].id}, assignment
                            ).map(res => res.json()
                            ).subscribe( data => {
                              assignment[key].selected = data.selected;
                            });
    }
  }
}
