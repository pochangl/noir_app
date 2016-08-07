import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {ProjectDetailPage} from './detail'

@Component({
	templateUrl: 'build/pages/project/list.html'
})

export class ProjectListPage {
	projects: any;
	assignments: any;
	
	constructor(
				private nav: NavController, 
				params: NavParams, 
				private http: Http
		){
		this.projects = [];
		this.http.get(
			'/api/v1/project/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.projects = data.objects;
		});
		
		this.assignments = [];
		this.http.get(
			'/api/v1/assignment/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.assignments = data.objects;
		});
	}
	
	count(){
		return this.assignments.filter(item=>!!item.selected).length;
	}
	
	click(project){
		this.nav.push(ProjectDetailPage, {project: project});
	}
}
