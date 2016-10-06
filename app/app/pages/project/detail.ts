import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Project_Service } from '../../providers/project_service/project_service';
import { HomePage } from '../general/home';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SelectedPipe } from "../pipes/selected_account";

@Component({
	templateUrl: 'build/pages/project/detail.html',
	providers: [Api, Project_Service],
	pipes: [SelectedPipe]
})

export class ProjectDetailPage {
	project: any;
	employee: any;
	employee_projects: any;
	assignments: any;
	assignments_count: number;
	ind_assignment: any;
	ind_assignment_id: any;

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
		this.assignments_count = 0;
		this.ind_assignment = {};

		this.http.get({
			resource_name: "employee_project",
			urlParams: {
				"project": this.project,
			}
		}).map(
			response => response.json()
		).subscribe(
			data => this.employee_projects = data.objects,
			err => console.error(err)
		);

		this.syncAssignments();
	}

  syncAssignments() {
		return this.http.get({
			resource_name: "assignment",
			urlParams: {
				"project": this.project,
			}
		}).map(
			response => response.json()
		).subscribe(
			data => {
				this.assignments_count = data.objects.length;
				this.assignments = data.objects[this.assignments_count-1];
			},
			err => console.error(err)
		);
	}

/*
	ngOnInit() {
	  this.assignments = this.assignments.filter(
	          id => this.assignments.employee.id === this.employee_projects.id);
	}
*/

	toggle(employee_project) {
		this.assignments = this.assignments.filter(
						id => this.assignments.employee.id === employee_project.id);
		// get assginment from employee_project
		// indicate assignment by employee_porject
		// 取消用函數，直接利用data跟error進行判斷
		// ind_assignment若放在外面，則第一次按抓不到,第二次按才會抓到,原因不明
		// this.indicateAssignment(employee_project);
		this.http.put(
			{
				resource_name: "assignment",
				//不可調用不同步行為，先建array存對應的id
				//id: this.indicateAssignmentId(employee_project)
				id: this.assignments.id
			}, this.assignments
		).map(
			response => response.json()
		).subscribe(
			//success
			data => {
				this.ind_assignment = data;
				// put assignment
						if(data.meta.total_count = 0){
							// create new assignment
						  employee_project.selected = !employee_project.selected;
						  this.createAssignment(this.ind_assignment);
						}else{
							//success
							// put assignment
							this.putAssignment(this.ind_assignment);
						}
			},
			//error subscribe data.meta.total_count = 0
			err => console.error(err)
			//() => console.log(this.ind_assignment)
		);
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


	putAssignment(ind_assignment: Object) {
		//ind_assignment_id為undefined,造成data lost
		/*
		return this.http.put({
	    resource_name: "assignment",
			id: ind_assignment.id
	  }, ind_assignment
		).subscribe(
			data => {
				// assignment = data.objects;
			},
			error => {
				console.error(error);
				this.syncAssignments();
			}
		)
		*/
	}

	createAssignment(ind_assignment){

	}

	count() {
		//return this.employees.filter(function(item){return !! item.selected;}).length;
		//Error: this.assignments.filter is not a function
		//將this.assignments改為array，故不能用filter
		//return this.assignments.filter(item=>!!item.selected).length;
		return 0;  //尚待解決。
	}

	//不可調用同步行為，改將this.assignment存在array中
	/*
	indicateAssignmentId(employee_project) {
		this.http.get({
			resource_name: "assignment",
			urlParams: {
				"employee": employee_project.employee,
				"project": employee_project.project
			}
		}).map(
			response => response.json()
		).subscribe(
			//若用map格式為list,抓不到id;
			//若不用map格式為response
			//Q:如何以dictionary方式抓出assignment.id？
			data => {
				if(data.meta.total_count == 0){
					this.createAssignment(this.ind_assignment);
				}else{
					this.ind_assignment_id = data.objects[0].id;
				}
			},
			err => console.error(err)
		);
	}
	*/
}
