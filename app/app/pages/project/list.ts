import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {ProjectDetailPage} from './detail';

@Component({
    templateUrl: 'build/pages/project/list.html',
    providers: [Api]
})

export class ProjectListPage {
	projects: any;
	assignments: any;

	constructor(
				private nav: NavController,
			  params: NavParams,
				private http: Api
		){
		this.projects = [];
		this.http.get({
        resource_name: "project"
    }).map(
      response => response.json()
		).subscribe((data)=>{
			this.projects = data.objects;
		});

		this.assignments = [];
	}

	count(){
		return this.assignments.filter(item=>!!item.selected).length;
	}

	click(project){
		this.nav.push(ProjectDetailPage, {project: project});
	}
}
