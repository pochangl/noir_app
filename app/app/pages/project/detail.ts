import {Component, Injectable} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {HomePage} from '../general/home';


@Component({
	templateUrl: 'build/pages/project/detail.html',
	providers: [Api]
})

export class ProjectDetailPage {
	project: any;
	assignments: any;
	employee_project: any;

	constructor(
				private nav: NavController,
				params: NavParams,
				private http: Api
		){
		this.project = params.data.project;

		this.assignments = [];
		this.http.get(
			'/api/v1/assignment/?user='+ this.project.id +'&format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.assignments = data.objects;
		});

		this.employee_project = [];
//		this.http.get(
//			'/api/v1/employee_project/?project=/api/v1/employee_project/'+ this.project.id +'/?format=json'
//		).map(response => response.json()
//		).subscribe((data)=>{
//			this.employee_project = data;
//		});
	}

	employee_name(){
		//return this.assignments.filter(item=>item.employee_project.project='/api/v1/project/' + this.project.id + '/');
		return "name";
	}

	count(){
		//return this.employees.filter(function(item){return !! item.selected;}).length;
		return this.assignments.filter(item=>!!item.selected).length;
	}
	toggle(assignment){
		assignment.selected = !assignment.selected;
		this.http.put({resource_name: "employee_project", id: assignment.id}, assignment).map(res => res.json()).subscribe( data => {
			assignment.selected = data.selected;
		})
	}

	submit(){
//		this.http.put(
//			'/api/v1/assignment/?format=json', {"selected": this.assignments.selected}
//		).map(response => response.json()
//		);

		this.nav.push(HomePage);
	}
}
