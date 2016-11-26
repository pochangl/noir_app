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
  rangeOfDateTime: any;

	constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ){
    this.assignments = new AssignmentList(this.api);
    //尚需增加filter by picked_date
    //無法用buildUrlParams抓start_date,tastypie要修改才能抓
    var rangeOfDateTime = (
      {"start_datetime__gte": params.data+"T00:00:00"},
      {"start_datetime__lte": params.data+"T23:59:59"}
    );
    this.assignments.buildUrlParams(rangeOfDateTime);
  }
  ionViewDidEnter(){
    console.log(this.rangeOfDateTime);
    this.assignments.fetch(this.rangeOfDateTime);
  }

	click(assignment){
		this.nav.push(ProjectDetailPage, {assignment: assignment});
	}
}
