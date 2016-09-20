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
			resource_name: "assignment",
		}).map(
			response => response.json()
		).subscribe((data)=>{
			this.assignments = data.objects;
		});
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
	}

	count(){
		//return this.employees.filter(function(item){return !! item.selected;}).length;
		return this.assignments.filter(item=>!!item.selected).length;
	}

	toggle(assignment){
		//Make selection change first, and then comunicate with DB.
		assignment.selected = !assignment.selected;
		this.employee = assignment.employee;

		if (!!(assignment.selected)) {
			this.http.put({
	      resource_name: "assignment",
				id: assignment.id
	    }, assignment
			).map(res => res.json()
			).subscribe(
				data => {
					assignment = data.objects;
				},
				error => {
					console.error("Error!");
				}
			)
		}else if (!!(!assignment.selected)) {
			//this.project_service.unassign_employee_project();
		}else {
			alert("Undefinded");
		}

//		this.http.put({resource_name: "assignment", id: assignment.id}, assignment
//		).map(res => res.json()
//		).subscribe( data => {
//			assignment.selected = data.selected;
//		})
	}
}
