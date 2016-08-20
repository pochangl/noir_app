import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { NavParams } from 'ionic-angular';
import { Dayoff } from './dayoff.define';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DayoffService {
	constructor (
		private http:Http,
		params: NavParams
	){
		this.employee = params.data.employee;
	}
	
	employee: any;
	private dayoffsUrl = '/api/v1/dayoff/'+ this.employee.id+'/?format=json';
	
	getDayoffs () : Observable<Dayoff[]> {
		return this.http.get(this.dayoffsUrl)
						.map(this.extractData)
						.catch(this.handleError);
	}
	
//	private extractData(res: Response) {
//		let errMsg = (error.message) ? error.message :
//			eerror.status ? `&{error.status} - &{error.statusText}` : `Server error`;
//			console.error(errMsg);
//			return Observable.throw(errMsg);
//	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}
	
	private handleError (error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `&{error.status} - &{error.statusText}` : `Server error`;
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
