import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from '../general/home';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import {Injectable} from '@angular/core';  

@Component({
	templateUrl: 'build/pages/transaction/paycheck.html'
})

export class PayCheckPage {
	title: "工資";
	employee: any;
	paychecks: any;
	//paycheck: any;
	
	constructor(private nav: NavController, 
				params: NavParams, 
				private http: Http
		){
		//this.pacheck = {};
		this.paychecks = [];
		this.employee = params.data.employee;
		this.http.get(
			//'/api/v1/paycheck/'+ this.employee.id +'?user='+this.employee.id+'&format=json'
			'/api/v1/paycheck/?employee='+this.employee.id+'&format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.paychecks = data.objects;
		});
	}
	amount(){
		if(this.paychecks.length <= 0){
			return 0;
		}else{
			//return this.paycheck.amount;
			return this.paychecks.map(paycheck=>paycheck.amount).reduce((prev, new_v)=>prev+new_v);
		}
	}
	submit(){
		if(this.paychecks.amount === undefined){
			alert("not ready");
			return;
		}
		this.http.put(
			'/api/v1/paycheck/?employee='+ this.employee.id +'&format=json', {"amount": this.amount}
		).map(response => response.json()
		);
		this.nav.push(HomePage);
	}
}
