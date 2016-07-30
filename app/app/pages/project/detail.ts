import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	templateUrl: 'build/pages/project/detail.html'
})

export class ProjectDetailPage {
    public dataObject;
    
	project;
    selectedItem: any;
	employees = [{name: "Employee 1", selected: false}, {name: "Employee 2", selected: false}, {name: "Employee 3", selected: false}];

	constructor(params: NavParams){
		this.project = params.data.project;
	}
	
	count(){
		//return this.employees.filter(function(item){return !! item.selected;}).length;
		return this.employees.filter(item=>!!item.selected).length;
	}
}
