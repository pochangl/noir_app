import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { SelectedPipe } from "../pipes/selected_account";
import { Assignment } from "./models"

@Component({
	templateUrl: 'build/pages/project/detail.html',
	pipes: [SelectedPipe]
})

export class ProjectDetailPage {
	assignment: Assignment;

	constructor(
				private nav: NavController,
				params: NavParams
		){
		this.assignment = params.data.assignment;
	}
	ionViewWillEnter(){
		this.assignment.fetch();
	}
	toggle(employee) {
		// employee.is_selected須由assignment fetch時一併處理；
		// 尚未解決
		if (employee.is_selected === true) {
			this.assignment.discard(employee);
		}else {
			if (this.assignment.is_full() === true) {
				alert("派工人數已達上限！")
			}else {
				this.assignment.add(employee);
			}
			employee.is_selected = !employee.is_selected;
		}
	}
}
