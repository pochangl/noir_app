import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
	templateUrl: 'build/pages/project/detail.html'
})

export class ProjectDetailPage {
	number_count = 3;
	
	project;
    selectedItem: any;
	employees = [{name: "Employee 1"}, {name: "Employee 2"}, {name: "Employee 3"}];

	constructor(params: NavParams) {
		this.project = params.data.project;
	}
	

    
	click(employee,number_count){
	    employee.selected = !employee.selected;
        number_count++;
        alert(number_count);
	};
}
