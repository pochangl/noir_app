import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
//import 'rxjs/Rx';
import '../../rxjs-operators';

//import { DayoffService } from "./dayoff.service";
//import { Dayoff } from './dayoff.define';
import { HomePage } from '../general/home';


@Component({
	//selector: 'dayoff-list,
	templateUrl: 'build/pages/schedule/dayoff.html',
//	providers: [ DayoffService ]
})


//export class DayoffPage implements OnInit{
export class DayoffPage {
	employee: any;
	dayoffs: any;
//	dayoffs: Dayoff[];
//	errorMessage: string;
	mode = 'Observable';

	constructor(
//		private dayoffService: DayoffService,
		private nav: NavController,
		params: NavParams,
		private http: Http
	){
		this.employee = params.data.employee;
		//this.dayoffs = Dayoff[];
		this.dayoffs = [];
		this.http.get(
			'/api/v1/dayoff/'+ this.employee.id+'/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.dayoffs = data;
		});
	}



//	ngOnInit() { this.getDayoffs(); }

//	getDayoffs() {
//		this.dayoffService.getDayoffs()
//						  .subscribe(
//							dayoffs => this.dayoffs = dayoffs,
//							error => this.errorMessage = <any>error);
//	}

	submit(){
//		this.http.put(
//			'/api/v1/dayoff/'+ this.employee.id+'/?format=json', {"dayoff": this.dayoffs}
//		).map(response => response.json()
//		);
		this.nav.push(HomePage);
	}
}
