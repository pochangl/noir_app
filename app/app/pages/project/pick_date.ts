import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjectListPage } from "./list"
import { AssignmentDateList } from './models'
import { Api } from '../../providers/api/api';


@Component({
  templateUrl: 'build/pages/project/pick_date.html',
  providers: [Api]
})

export class PickDatePage {
  dates: AssignmentDateList

  constructor(
    private nav: NavController,
    params: NavParams,
    private api: Api
  ){
    this.dates = new AssignmentDateList(api)
  }
  ionViewWillEnter(){
    this.dates.fetch();
  }

  click(date){
    this.nav.push(ProjectListPage, {"date": date});
  }
}
