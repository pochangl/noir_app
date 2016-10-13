import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {ProjectListPage} from './list';

@Component({
    templateUrl: 'build/pages/project/proj_choose_date.html',
    providers: [Api]
})

export class ProjChooseDatePage {
  assign_date: any;

  constructor(
      private nav: NavController,
      params: NavParams,
      private http: Api
  ){
    // this.assign_date = "";
    this.assign_date = [];
    this.http.get({
      resource_name: "assignment",
      id: "1"
    }).map(
      response => response.json()
    ).subscribe(
      data => {
        this.assign_date = data;
        console.log(this.assign_date);
      },
      err => console.error(err)
    );
  }

  submit(assign_date){
    // console.log(assign_date);
    this.nav.push(ProjectListPage, {assign_date: assign_date});
  }
}
