import {Component, Injectable} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {HomePage} from '../general/home';
import { Headers, RequestOptions } from '@angular/http';

@Component({
	templateUrl: 'build/pages/project/detail.html',
	providers: [Api]
})

export class ProjectDetailPage {
	project: any;
	assignments: any;

	constructor(
				private nav: NavController,
				params: NavParams,
				private http: Api
		){
		this.project = params.data.project;

		this.assignments = [];

		this.http.get({
			resource_name: "assignment",
//property不支援filtering
//			urlParams: {
//				project: this.project.id,
//			}
		}).map(
			response => response.json()
		).subscribe((data)=>{
			this.assignments = data.objects;
		});
	}

	count(){
		//return this.employees.filter(function(item){return !! item.selected;}).length;
		return this.assignments.filter(item=>!!item.selected).length;
	}

	toggle(assignment){
		assignment.selected = !assignment.selected;

//		let body = JSON.stringify({ assignment: assignment });
//		let headers = new Headers({ 'Content-Type': 'application/json' });
//		let options = new RequestOptions({ headers: headers });

//		return this.http.put({resource_name: "assignment", id: assignment.id}, body, options)
//                    .map(res => res.json())
//										.subscribe( data => {
//													assignment.selected = data.selected;
//										});

		this.http.put({resource_name: "assignment", id: assignment.id}, assignment
		).map(res => res.json()
		).subscribe( data => {
			assignment.selected = data.selected;
		})
	}
}
