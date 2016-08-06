import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from '../general/home';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import {Injectable} from '@angular/core';  

@Component({
	templateUrl: 'build/pages/transaction/debt.html'
})

export class DebtPage {
	title: "工資";
	employee: any;
	debts: any;
	//debt: any;
	
	constructor(private nav: NavController, 
				params: NavParams, 
				private http: Http
		){
		//this.debt = {};
		this.debts = [];
		this.employee = params.data.employee;
		this.http.get(
			//'/api/v1/debt/'+ this.employee.id +'?user='+this.employee.id+'&format=json'
			'/api/v1/debt/?employee='+this.employee.id+'&format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.debts = data.objects;
		});
	}
	amount(){
		if(this.debts.length <= 0){
			return 0;
		}else{
			//return this.debt.amount;
			return this.debts.map(debt=>debt.amount).reduce((prev, new_v)=>prev+new_v);
		}
	}
	submit(){
		if(this.debts.amount === undefined){
			alert("not ready");
			return;
		}
		this.http.put(
			'/api/v1/debt/?employee='+ this.employee.id +'&format=json', {"amount": this.amount}
		).map(response => response.json()
		);
		this.nav.push(HomePage);
	}
}
