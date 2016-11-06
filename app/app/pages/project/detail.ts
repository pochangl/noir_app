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
	assignment: any;

	constructor(
				private nav: NavController,
				params: NavParams,
		){
		this.assignment = params.data.assignment;
		this.assignment.fetch();
	}
	toggle(employee) {
		if(this.assignment.is_full()){
			alert("This assignment is full");
		}else if(employee.is_selected){
			this.assignment.add(employee)
		}else{
			this.assignment.remove(employee)
		}
	}
}
