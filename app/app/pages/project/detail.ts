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
		this.assignment.add(employee);
	}
}
