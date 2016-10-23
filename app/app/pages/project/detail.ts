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
		//將已被指派到其他工地的人，另外列在另一個table顯示 (或者直接就不顯示？)

		return this.http.get({
			resource_name: "employee_assignment",
			urlParams: {
				"assignment__start_datetime": this.assignment.start_datetime,
			}
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
			this.checkNumberCount(employee_assignment) ?
					this.updateEmployeeAssignment(employee_assignment) : alert("指派人數超過需求人數！");
		}else{
			if(employee_assignment.selected === true){
				alert("該員工已被指派至其他工地！");
			}else{
				employee_assignment.assignment = this.assignment;
				this.checkNumberCount(employee_assignment) ?
						this.updateEmployeeAssignment(employee_assignment) : alert("指派人數超過需求人數！");
			};
		};
		this.syncEmployeeAssignment();
	}

	updateEmployeeAssignment(employee_assignment) {
		employee_assignment.selected = !employee_assignment.selected;
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
		if(employee_assignment.selected === true){
			this.assignment.count = this.assignment.count - 1;
			return true;
		}else{
			if (this.assignment.count >= this.assignment.number_needed){
				return false;
			}else{
				this.assignment.count = this.assignment.count + 1;
				return true;
			}
		}
	}
}
