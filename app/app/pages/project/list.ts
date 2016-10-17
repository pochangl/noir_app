import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {ProjectDetailPage} from './detail';
import { OrderByPipe } from "../pipes/selected_account";

@Component({
    templateUrl: 'build/pages/project/list.html',
    providers: [Api],
  	pipes: [OrderByPipe]
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
	}
  ionViewWillEnter(){
		this.http.get({
        resource_name: "assignment"
    }).map(
      response => response.json()
		).subscribe((data)=>{
			this.assignments = data.objects;
      },
      err => console.error(err)
    );
  }

	click(assignment){
		this.nav.push(ProjectDetailPage, {assignment: assignment});
	}
}
