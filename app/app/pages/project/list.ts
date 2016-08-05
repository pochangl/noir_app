import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {ProjectDetailPage} from './detail'

@Component({
	templateUrl: 'build/pages/project/list.html'
})

export class ProjectListPage {
	projects: any;
	constructor(private nav: NavController, private http: Http){
		this.projects = [];
		this.http.get(
			'/api/v1/project/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.projects = data.objects;
		});
		

	}
	click(project){
		this.nav.push(ProjectDetailPage, {project: project});
	}
}
