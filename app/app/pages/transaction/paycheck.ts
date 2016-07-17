import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/transaction/paycheck.html'
})

export class PayCheckPage {
	employees = {1:{name: "Employee 1", id: 1, amount: 2000}, 2:{name: "Employee 2", id:2, amount: 4000}, 3:{name: "Employee 3", id: 6000}};
	employee: any;
	title: "工資";

	constructor(navParams: NavParams){
		var id = navParams.get("employee").id;
		this.employee = this.employees[id];
	}
}
