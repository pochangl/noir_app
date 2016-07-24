import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProjectDetailPage} from './detail'


@Component({
	templateUrl: 'build/pages/project/list.html'
})

export class ProjectListPage {
	projects = [{"id":1,"name":"工地 1"},{"id":2,"name":"工地 2"},{"id":3,"name":"工地 3"}];

	constructor(private nav: NavController){
	}
	click(project){
		this.nav.push(ProjectDetailPage, {project: project});
	}
}
