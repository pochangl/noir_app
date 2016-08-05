import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';

@Component({
	templateUrl: 'build/pages/transaction/paycheck.html'
})

export class PayCheckPage {
	title: "工資";
	employee;
	//employees = {1:{name: "Employee 1", id: 1, amount: 2000}, 2:{name: "Employee 2", id:2, amount: 4000}, 3:{name: "Employee 3", id: 6000}};
	paycheck: any;
	id;
	
	constructor(params: NavParams, private http: Http){
		this.employee = params.data.employee;
		this.id = this.employee.id;
		this.http.get(
			'/api/v1/paycheck/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.paycheck = data.objects.filter(item=> !! (item.employee.id=this.id));
			console.log(this.paycheck);
		});
	}
	amount(){
		return this.paycheck=this.paycheck.filter(item=> !! (item.employee.id=this.id));
	}
}
