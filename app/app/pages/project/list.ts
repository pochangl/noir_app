import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {ProjectDetailPage} from './detail';
import {OrderByPipe } from "../pipes/selected_account";
import {AssignmentList, Assignment} from "./models"

@Component({
    templateUrl: 'build/pages/project/list.html',
    providers: [Api],
  	pipes: [OrderByPipe]
})

export class ProjectListPage {
	assignments: AssignmentList
  assign_date: any;

	constructor(private nav: NavController, private api: Api){
    this.assignments = new AssignmentList(this.api);
  }
  ionViewWillEnter(){
    this.assignments.fetch();
  }

	click(assignment){
		this.nav.push(ProjectDetailPage, {assignment: assignment});
	}
}
