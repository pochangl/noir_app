import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjectListPage } from "./list"

@Component({
  templateUrl: 'build/pages/project/pick_date.html'
})

export class PickDatePage {
  picked_date: string;
  choosingDate: string;

  constructor(
    private nav: NavController,
    params: NavParams
  ){
    var today = new Date();
    this.choosingDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  }

  submit(){
    var picked_date = {
      "employee": {"contact": {"id": 0, "name": ""}, "id": 0},
                  "id": 1,
                  "start_datetime": this.choosingDate + "T" + "08:00:00",
                  "start_date": this.choosingDate,
                  "start_time": "08:00:00",
                  "end_datetime": this.choosingDate + "T" + "17:00:00",
                  "end_date": this.choosingDate,
                  "end_time": "17:00:00"
    };
    this.nav.push(ProjectListPage, {employee: this.picked_date});
  }
}
