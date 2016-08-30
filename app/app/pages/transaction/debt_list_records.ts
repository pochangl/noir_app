import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Headers} from '@angular/http';
import { Api } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import {DebtPage} from '../transaction/debt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import {Injectable} from '@angular/core';

@Component({
	templateUrl: 'build/pages/transaction/debt_list_records.html',
	providers: [Api]
})

export class DebtListRecordsPage {
	title: "工資";
	employee: any;
	debts: any;

	constructor(private nav: NavController,
				params: NavParams,
				private http: Api
		){
		this.debts = [];
		this.employee = params.data.employee;
		this.http.get({
			resource_name: "debt",
			urlParams: {
				"employee": this.employee,
			}
			//'/api/v1/debt/?employee='+this.employee.id+'&format=json'
		}).map(response => response.json()
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

	click(debt){
		this.nav.push(DebtPage, {debt: debt});
	}
}