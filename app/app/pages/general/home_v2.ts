import {Component} from '@angular/core';
import {Loading, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';

import {ProjectDetailPage} from '../project/detail'
import {HomePage} from '../general/home';
import {PayCheckPage} from '../transaction/paycheck';
import {DayOffPage} from '../schedule/dayoff';


@Component({
    templateUrl: 'build/pages/general/home_v2.html'
})
export class HomePageV2 {  
	//slide page of project
  	projects = [];
  	number_count = 0;

	constructor(
		private nav: NavController
	){
		this. projects = [{"id":1,"name":"工地 1","number_needed":"1"},{"id":2,"name":"工地 2","number_needed":"2"},{"id":3,"name":"工地 3","number_needed":"3"}];
	}
	numberCount(){
		return this.number_count;
	}
	click_of_project(project){
		this.nav.push(ProjectDetailPage, { project: project });
	}
	
		
	//slide page of transaction
	employees = [{name: "Employee 1", id: 1}, {name: "Employee 2", id:2}, {name: "Employee 3", id: 3}];
	click_of_transaction(employee){
		this.nav.push(PayCheckPage, {employee: employee});
	}
	
	
	//slide page of schedule
	//employees = [{name: "Employee 1", id: 1}, {name: "Employee 2", id:2}, {name: "Employee 3", id: 3}];
	click_of_schedule(employee){
		this.nav.push(DayOffPage, {employee: employee});
	}
	
	
	//slide page of sign in
	presentLoading() {
		let loading = Loading.create({
			content: "Please wait...",
			duration: 3000,
			dismissOnPageChange: true
		});
		this.nav.present(loading);
	}
	sign_in(){
		this.presentLoading();
		this.nav.push(HomePage);
	}
}
