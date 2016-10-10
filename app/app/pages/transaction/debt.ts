import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Headers} from '@angular/http';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {HomePage} from '../general/home';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import {Injectable} from '@angular/core';

@Component({
	templateUrl: 'build/pages/transaction/debt.html',
	providers: [Api]
})

export class DebtPage {
	title: "工資";
	debt: any;
	employee_name: any;

	constructor(private nav: NavController,
				params: NavParams,
				private http: Api
		){
		this.debt = params.data.debt;
		this.employee_name = this.debt.employee.contact.name;
	}
	amount(){
		if(this.debt.length <= 0){
			return 0;
		}else{
			//return this.debt.amount;
			return this.debt.amount;
		}
	}
	submit(){
		if(this.debt.amount === undefined){
			alert("not ready");
			return;
		}else{
			this.http.put(
				{
					resource_name: "debt",
					id: this.debt.id
				}, this.debt
			).subscribe(
				data=>{},
				err => console.error(err)
			);
		}

		//this.nav.push(HomePage);
	}
}
