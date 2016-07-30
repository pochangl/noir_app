import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProjectDetailPage} from './detail'

@Component({
	templateUrl: 'build/pages/project/list.html'
})

export class ProjectListPage {
	projects = [];
	employees = [];
	constructor(private nav: NavController){
		this. projects = [{"id":1,"name":"工地 1","number_needed":"1"},{"id":2,"name":"工地 2","number_needed":"2"},{"id":3,"name":"工地 3","number_needed":"3"}];
		this.employees = [{name: "Employee 1", selected: false}, {name: "Employee 2", selected: false}, {name: "Employee 3", selected: false}];
	}
	click(project){
		this.nav.push(ProjectDetailPage, { project: project });
	}	
	count(){
		return this.employees.filter(item=>!!item.selected).length;
	}
}
