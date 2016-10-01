import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Project_Service } from '../../providers/project_service/project_service';
import { HomePage } from '../general/home';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	templateUrl: 'build/pages/project/detail.html',
	providers: [Api, Project_Service]
})

export class ProjectDetailPage {
	project: any;
	employee: any;
	employee_projects: any;
	assignments: any;

	constructor(
				private nav: NavController,
				params: NavParams,
				private http: Api,
				private project_service: Project_Service
		){
		this.project = params.data.project;
		this.employee = Object;
		this.employee_projects = [];
		this.assignments = [];

		this.http.get({
			resource_name: "employee_project",
			urlParams: {
				"project": this.project,
			}
		}).map(
			response => response.json()
		).subscribe((data)=>{
			this.employee_projects = data.objects;
		});

		this.syncAssignments();
	}

	indicateEmployeeProject (assignment){
    return this.http.get({
					resource_name: "employee_project",
					urlParams: {
						"employee": assignment.employee,
						"project": assignment.project
					}
				}).map(
					response => response.text()
				).subscribe(
		      data => this.employee_projects = data,
		      err => console.error(err),
					() => console.log(this.employee_projects)
    		);
	}

  syncAssignments(){
		return this.http.get({
			resource_name: "assignment",
		}).map(
			response => response.json()
		).subscribe((data)=>{
			this.assignments = data.objects;
		});
	}

	count(){
		//return this.employees.filter(function(item){return !! item.selected;}).length;
		return this.assignments.filter(item=>!!item.selected).length;
	}

	toggle(assignment){
		assignment.selected = !assignment.selected;
		// get assginment from employee_project
		// 修改detail版面,並增加employee_project的selected屬性
		this.indicateEmployeeProject(assignment);
			//success
				// put assignment
			//error subscribe data.meta.total_count = 0
				// create new assignment
					//success
						// put assignment
	}

/*
	toggle(assignment){
		//Make selection change first, and then comunicate with DB.
		assignment.selected = !assignment.selected;
		this.employee = assignment.employee;

		var val = assignment.selected;
		this.http.put({
      resource_name: "assignment",
			id: assignment.id
    }, assignment
		).subscribe(
			data => {
				// assignment = data.objects;
			},
			error => {
				this.sync_assignment();
			}
		)
	}
*/
}
