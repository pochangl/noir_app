import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
	templateUrl: 'build/pages/project/detail.html'
})

export class ProjectDetailPage {
    selectedItem: any;
	employees = [{name: "Employee 1"}, {name: "Employee 2"}, {name: "Employee 3"}];

	constructor(private nav: NavController, navParams: NavParams){
		this.selectedItem = navParams.get('project');
	}
	click(employee){
	    employee.selected = !employee.selected;
	};
}
