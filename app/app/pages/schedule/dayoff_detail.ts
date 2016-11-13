import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Api } from '../../providers/api/api';
import '../../rxjs-operators';
import { HomePage } from '../general/home';

import { DayOff } from "./models"

@Component({
	templateUrl: 'build/pages/schedule/dayoff.html'
})

export class DayOffDetailPage {
	dayoff: DayOff;

	constructor(
		private nav: NavController,
		params: NavParams
	){
		this.dayoff = params.data.dayoff;
	}

  ionViewWillEnter(){
    this.dayoff.fetch();
		// ).subscribe(
		// 	data => {
		// 		//使用id_count以避免不止一筆資料之情形。
		// 		//直接把[id_count]加在objects後面，不知道有無後遺症？
		// 		this.dayoffs_count = data.objects.length;
		// 		this.dayoff = data.objects[this.dayoffs_count-1];
		// 	},
		// 	err => console.error(err)
		// );
  }

	submit(){
		console.log(this.dayoff.isValidDateTime());
		if(this.dayoff.isValidDateTime() === false){
			alert("起始時間不可大於結束時間！");
		}else{
			this.dayoff.commit();
			// this.nav.push(HomePage);
		}
	}
}
