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

  submit(){
    this.nav.push(ProjectListPage, {"start_date": this.picked_date});
  }
}
