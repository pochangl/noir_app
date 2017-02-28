import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProjectListPage } from './list';
import { HomePage } from '../general/home';
import { AssignmentDateList } from './models';
import { Api } from '../../providers/api/api';


@Component({templateUrl: 'pick_date.html',providers: [Api]})
export class PickDatePage {
  dates: AssignmentDateList;

  constructor(
    protected nav: NavController,
    protected api: Api
  ) {
    this.dates = new AssignmentDateList(this.api);
  }

  ionViewWillEnter () {
    this.dates.fetch();
  }

  click (date) {
    this.nav.push(ProjectListPage, {'date': date});
  }
  addDatePage () {
    var today = new Date();
    var today_month = today.getMonth() + 1;
    var today_day = today.getDate();
    var today_date = today.getFullYear() + '-' + (today_month < 10 ? '0' + today_month : today_month) + '-' + (today_day < 10 ? '0' + today_day : today_day);
    if ( today_date === this.dates.objects[0].date ) {
      // 用日期判定,遇到要修改資料的時候會出現問題;每次都新增所有的工地,則可以避免此問題.
      alert('資料已存在,無法新增！');
    } else {
      this.dates.add_date(today_date);
      this.nav.push(HomePage);
    }
  }
}
