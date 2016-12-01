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
		if ( this.assignment.has(employee) ) {
			this.assignment.discard(employee);
		}else	if (this.assignment.is_full() === true) {
			alert("派工人數已達上限！");
		}else {
			this.assignment.add(employee);
		}
	}
}
