import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import {DebtPage} from '../transaction/debt';

@Component({
	templateUrl: 'build/pages/account/list.html'
})


export class DebtListPage {
	employees: any;

	constructor(private nav: NavController, private http: Http){
		this.employees = [];
		this.http.get(
			'/api/v1/employee/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.employees = data.objects;
		});
	}
	click(employee){
		this.nav.push(DebtPage, {employee: employee});
	}
}
