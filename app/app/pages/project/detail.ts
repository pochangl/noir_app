import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
	templateUrl: 'build/pages/project/detail.html'
})

export class ProjectDetailPage {
	project;
    selectedItem: any;
	employees = [{name: "Employee 1"}, {name: "Employee 2"}, {name: "Employee 3"}];

	constructor(params: NavParams) {
		this.project = params.data.project;
	}
	click(employee){
	    employee.selected = !employee.selected;
	};
}
