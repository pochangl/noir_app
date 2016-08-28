import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers } from '@angular/http';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import { HomePage } from '../general/home';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import {Injectable} from '@angular/core';

@Component({
	templateUrl: 'build/pages/transaction/paycheck.html',
	providers: [Api]
})

export class PayCheckPage {
	title: "工資";
	paycheck: any;
	employee_name: any;

	constructor(private nav: NavController,
				params: NavParams,
				private http: Api
		){
		this.paycheck = params.data.paycheck;
		this.employee_name = this.paycheck.employee.contact.name;
	}
	amount(){
		if(this.paycheck.length <= 0){
			return 0;
		}else{
			//return this.paycheck.amount;
			return this.paycheck.amount;
		}
	}
	submit(){
		if(this.paycheck.amount === undefined){
			alert("not ready");
			return;
		}
		//this.http.put(
		//	'/api/v1/paycheck/?employee='+ this.paycheck.employee.id +'&format=json', {"amount": this.amount}
		//).map(response => response.json()
		//);
		this.nav.push(HomePage);
	}
}
