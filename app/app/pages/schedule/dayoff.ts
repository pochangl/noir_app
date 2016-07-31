import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';


@Component({
	templateUrl: 'build/pages/schedule/dayoff.html'
})

export class DayOffPage {
	employee;
	
	constructor(params: NavParams, private http: Http){
		this.employee = params.data.employee;
	}
}
