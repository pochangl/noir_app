import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	templateUrl: 'build/pages/project/detail.html'
})

export class ProjectDetailPage {
    public dataObject;
    
	project;
	employees: any;
    selectedItem: any;

	constructor(params: NavParams, private http: Http){
		this.project = params.data.project;
		this.http.get(
			'/api/v1/employee/?format=json'
		).map(response => response.json()
		).subscribe((data)=>{
			this.employees = data.objects;
		});
	}
	
	count(){
		//return this.employees.filter(function(item){return !! item.selected;}).length;
		//return this.employees.filter(item=>!!item.selected).length;
		return 0;
	}
}
