import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import '../../rxjs-operators';
import { HomePage } from '../general/home';
import { DayOff } from './models';

@Component({
  templateUrl: 'build/pages/schedule/dayoff_detail.html'
})

export class DayOffDetailPage {
  dayoff: DayOff;

  constructor(
    private nav: NavController,
    params: NavParams
  ) {
    this.dayoff = params.data.dayoff;
  }

  ionViewWillEnter () {
    this.dayoff.fetch();
  }

  submit () {
    this.dayoff.start_datetime = this.dayoff.start_date.concat(this.dayoff.start_datetime.substring(10));
    this.dayoff.start_datetime = this.dayoff.start_datetime.substring(0, 11).concat(this.dayoff.start_time);
    this.dayoff.end_datetime = this.dayoff.end_date.concat(this.dayoff.end_datetime.substring(10));
    this.dayoff.end_datetime = this.dayoff.end_datetime.substring(0, 11).concat(this.dayoff.end_time);
    if (this.dayoff.isValidDateTime(this.dayoff) === false) {
      alert('起始時間不可大於結束時間！');
    } else {
      this.dayoff.commit();
      this.nav.push(HomePage);
    }
  }
  delete () {
    this.dayoff.delete();
    this.nav.push(HomePage);
  }
  cancle () {
    this.nav.push(HomePage);
  }
}
