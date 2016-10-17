import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { HomePage } from '../general/home';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SelectedPipe } from "../pipes/selected_account";

@Component({
	templateUrl: 'build/pages/project/detail.html',
	providers: [Api],
	pipes: [SelectedPipe]
})

export class ProjectDetailPage {
	assignment: any;
	employees: any;
	employee_assignments: any;
	other_emp_asss: any;

	constructor(
				private nav: NavController,
				params: NavParams,
				private http: Api
		){
		this.assignment = params.data.assignment;
		this.employees = [];
		this.employee_assignments = [];
		this.other_emp_asss = [];

		this.syncEmployeeAssignment();
	}

  syncEmployeeAssignment() {
		this.http.get({
			resource_name: "employee_assignment",
			urlParams: {
				"assignment__project": this.assignment.project.id,
			}
		}).map(
			response => response.json()
		).subscribe(
			data => {
				this.other_emp_asss = data.objects;
			},
			err => console.error(err)
		);

		return this.http.get({
			resource_name: "employee_assignment"
		}).map(
			response => response.json()
		).subscribe(
			data => {
				this.employee_assignments = data.objects;
			},
			err => console.error(err)
		);
	}

	toggle(employee_assignment) {
		//首先判斷人數是否超過，若超過則alert並重新讀取頁面.
		//先區分employee_assignment與assignment的工地是否相同，
		//再判斷employee_assignment的selected狀態，
		//共4種情形分別執行不同動作
		if(employee_assignment.assignment.id === this.assignment.id) {
			if(employee_assignment.selected === true){
				this.assignment.count = this.assignment.count - 1;
				employee_assignment.selected = !employee_assignment.selected;
				this.updateEmployeeAssignment(employee_assignment);
				this.syncEmployeeAssignment();
			}else{
				this.checkNumberCount(employee_assignment);
			}
		}else{
			if(employee_assignment.selected === true){
				alert("該員工已被指派至其他工地！");
				this.syncEmployeeAssignment();
			}else{
				//工地不同時，變更工地為assignment的工地
				//雖然有吃到，但不知道為什麼put上去卻是原來的工地？
				// console.log(employee_assignment.assignment);
				// console.log(this.assignment);
				employee_assignment.assignment = this.assignment;
				this.checkNumberCount(employee_assignment);
			};
		};
	}

	updateEmployeeAssignment(employee_assignment) {
		// console.log(employee_assignment.assignment);
		return this.http.put(
			{
				resource_name: "employee_assignment",
				id: employee_assignment.id
			}, employee_assignment
		).subscribe(
			data => {},
			err => console.error(err)
		);
	}

	checkNumberCount(employee_assignment) {
		if (this.assignment.count >= this.assignment.number_needed){
			alert("指派人數超過需求人數！");
			this.syncEmployeeAssignment();
			return false;
		}else{
			this.assignment.count = this.assignment.count + 1;
			employee_assignment.selected = !employee_assignment.selected;
			this.updateEmployeeAssignment(employee_assignment);
			this.syncEmployeeAssignment();
			return true;
		}
	}
}
