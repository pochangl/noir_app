import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {ProjectDetailPage} from './detail';

@Component({
    templateUrl: 'build/pages/project/list.html',
    providers: [Api]
})

export class ProjectListPage {
	// projects: any;
	assignments: any;
  assign_date:any;

	constructor(
				private nav: NavController,
			  params: NavParams,
				private http: Api
	){
		this.assignments = [];
		this.http.get({
        resource_name: "assignment"
    }).map(
      response => response.json()
		).subscribe((data)=>{
			this.assignments = data.objects;
		});
	}

	count(){
		// return this.assignments.filter(item=>!!item.selected).length;
    return 0;
	}

	click(assignment){
		this.nav.push(ProjectDetailPage, {assignment: assignment});
	}
}
