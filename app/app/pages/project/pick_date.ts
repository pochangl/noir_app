import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjectListPage } from "./list"

@Component({
  templateUrl: 'build/pages/project/pick_date.html'
})

export class PickDatePage {
  picked_date: string;

  constructor(
    private nav: NavController,
    params: NavParams
  ){
    var today = new Date();
    this.picked_date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  }

  click(picked_date){
    // var initial_data = {
    //   "approved": false,
    //   "availables": [],
    //   "comment": "",
    //   "create_time": "",
    //   "employees": [],
    //   "end_date": this.picked_date,
    //   "end_datetime": this.picked_date+"T17:00:00",
    //   "end_time": "17:00:00",
    //   "id": 0,
    //   "modify_time": "",
    //   "number_needed": 0,
    //   "project": {},
    //   "serial": "",
    //   "start_date": this.picked_date,
    //   "start_datetime": this.picked_date+"T08:00:00",
    //   "start_time": "08:00:00"
    // }
    // this.nav.push(ProjectListPage, {"assignment": initial_data});
    this.nav.push(ProjectListPage, {"start_date": picked_date});
  }
}
