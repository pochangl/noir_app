import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {DayOffDetailPage} from '../schedule/dayoff_detail';
import {DayOffList} from "./models";

@Component({
	templateUrl: 'build/pages/account/list.html',
  providers: [Api]
})

export class DayOffDaysPage {
  dayoffs: DayOffList;
  title: string;
  
	constructor(
		private nav: NavController,
		private api: Api
	){
		this.dayoffs = new DayOffList(this.api);
		this.title="休假-選擇休假紀錄";
	}
  ionViewWillEnter(){
    this.dayoffs.fetch();
  }
	click(employee){
		this.nav.push(DayOffDetailPage, {employee: employee});
	}
}
