import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	templateUrl: 'build/pages/project/detail.html'
})

export class ProjectDetailPage {
    public dataObject;
	number_count = 0;
    
	project;
    selectedItem: any;
	employees = [{name: "Employee 1", selected: false}, {name: "Employee 2", selected: false}, {name: "Employee 3", selected: false}];

	constructor(
		params: NavParams,
		private http: Http
	){
		this.project = params.data.project;
	}
	
	numberCount(){
		return this.number_count;
	}
    
	ngModel(employee){
	    employee.selected = !employee.selected;
	}
}
