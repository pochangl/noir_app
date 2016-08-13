import {Component, Injectable} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {HomePage} from '../general/home';


@Component({
	templateUrl: 'build/pages/project/detail.html'
})

export class ProjectDetailPage {
	project: any;
	assignments: any;
	employee_project: any;

	constructor(
				private nav: NavController, 
				params: NavParams, 
				private http: Http
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
	
	submit(){
//		this.http.put(
//			'/api/v1/assignment/?format=json', {"selected": this.assignments.selected}
//		).map(response => response.json()
//		);
		
		this.nav.push(HomePage);
	}
}
