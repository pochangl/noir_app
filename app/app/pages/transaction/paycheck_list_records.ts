import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {PayCheckPage} from '../transaction/paycheck';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import {Injectable} from '@angular/core';  

@Component({
	templateUrl: 'build/pages/transaction/paycheck_list_records.html'
})

export class PayCheckListRecordsPage {
	title: "工資";
	employee: any;
	paychecks: any;
	//paycheck: any;
	
	constructor(private nav: NavController, 
				params: NavParams, 
				private http: Http
		){
		this.employee = params.data.employee;
		
		//this.pacheck = {};
		this.paychecks = [];
		this.http.get(
			//'/api/v1/paycheck/'+ this.employee.id +'?user='+this.employee.id+'&format=json'
			'/api/v1/paycheck/?employee='+this.employee.id+'&format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.paychecks = data.objects;
		});
	}
	
	click(paycheck){
		this.nav.push(PayCheckPage, {paycheck: paycheck});
	}
}
