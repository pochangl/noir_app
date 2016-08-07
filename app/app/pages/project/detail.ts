import {Component, Injectable} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {HomePage} from '../general/home';


@Component({
	templateUrl: 'build/pages/project/detail.html'
})

export class ProjectDetailPage {
	project;
	assignments: any;

	constructor(
				private nav: NavController, 
				params: NavParams, 
				private http: Http
		){
		this.project = params.data.project;
		
		this.assignments = [];
		this.http.get(
			'/api/v1/assignment/?user='+ this.project.id+'&format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.assignments = data.objects;
		});
	}
	
	employee_name(){
		//return this.assignments.filter(item=>item.employee_project.id=this.project.id).employee.contact.name;
		return "name";
	}
	
	count(){
		//return this.employees.filter(function(item){return !! item.selected;}).length;
		return this.assignments.filter(item=>!!item.selected).length;
	}
	
	submit(){
		this.nav.push(HomePage);
	}
}
