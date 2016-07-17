import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PayCheckPage} from '../transaction/paycheck';


@Component({
	templateUrl: 'build/pages/account/list.html'
})

export class PayCheckListPage {
	employees = [{name: "Employee 1", id: 1}, {name: "Employee 2", id:2}, {name: "Employee 3", id: 3}];

	constructor(private nav: NavController){
	}
	click(employee){
		this.nav.push(PayCheckPage, {employee: employee});
	}
}
