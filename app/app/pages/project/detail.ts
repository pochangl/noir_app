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
	employee_assignments: any;
	ass_number_needed: number;
	ass_number_count: number;

	constructor(
				private nav: NavController,
				params: NavParams,
				private http: Api
		){
		this.assignment = params.data.assignment;
		this.employee_assignments = [];
		this.ass_number_needed = this.assignment.number_needed;

		this.syncEmployeeAssignment();
	}

  syncEmployeeAssignment() {
		return this.http.get({
					resource_name: "employee_assignment",
					urlParams: {
						"assignment": this.assignment.id,
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
		employee_assignment.selected = !employee_assignment.selected;
		this.count();

		if (this.ass_number_count > this.ass_number_needed){
			alert("指派人數超過需求人數！");

			//若本來是超出人數，則執行http.put取消掉select
			console.log(employee_assignment.selected);
			if(
				employee_assignment.selected == false &&
				this.ass_number_count == this.ass_number_needed +1
			) {
				this.updateEmployeeAssignment(employee_assignment);
			}else{
				//若selected是從false變成true，故還原selected狀態為faslse
				//但是無法改為ionic狀態為false;重新導回上一頁,但好像又不太方便
				//故重新讀取一遍employee_assignment
				this.syncEmployeeAssignment()
			};
		}else{
			this.updateEmployeeAssignment(employee_assignment);
		}
	}

	count() {
		this.ass_number_count = this.employee_assignments.filter(item=>!!item.selected).length;
		return this.ass_number_count;
	}

	updateEmployeeAssignment(employee_assignment) {
		this.http.put(
			{
				resource_name: "employee_assignment",
				id: employee_assignment.id
			}, employee_assignment
		).subscribe(
			data => {},
			err => console.error(err)
		);
	}
}
