import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {HomePage} from '../general/home';


@Component({
	templateUrl: 'build/pages/schedule/dayoff.html'
})


export class DayOffPage {
	employee: any;
	dayoffs: any;
	
	constructor(private nav: NavController, 
				params: NavParams, 
				private http: Http
		){
		this.employee = params.data.employee;
		
		this.dayoffs = [];
		this.http.get(
			//'/api/v1/dayoff/?employee='+this.employee.id+'&format=json'
			'/api/v1/dayoff/'+ this.employee.id+'/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.dayoffs = data;
			console.log(this.dayoffs.start_date);
		});
	}
	
	public event = {
		month: '2016-06-15',
		timeStarts: '08:30:00',
		timeEnds: '17:30'
	}
	
	submit(){
//		if(this.dayoffs.amount === undefined){
//			alert("not ready");
//			return;
//		}
		this.http.put(
			'/api/v1/dayoff/?employee='+ this.dayoffs.employee.id +'&format=json', {"start_time": this.dayoffs.start_time}
		).map(response => response.json()
		);
		this.nav.push(HomePage);
	}
}
