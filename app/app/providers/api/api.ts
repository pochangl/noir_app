import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';


/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

class Url{
  id: string;
  resource_name: string;
  urlParams: Object;
  api_key: string;
  username: string;
  constructor(kwargs: {
    "id"?: string,
    "resource_name": string,
    "urlParams"?: Object,
  }){
    this.id = (!!kwargs.id || kwargs.id === "") ? kwargs.id + "/": "";
    this.resource_name= kwargs.resource_name + "/";
    this.urlParams = kwargs.urlParams ? kwargs.urlParams: {};
    this.username = "edward";
    this.api_key = "cecb19e5636529cfceb51adef7597c2c6b4fe258";
  }

  getQueryString(){
    var params = new URLSearchParams("");
    if (!!this.urlParams) {
        for(var key in this.urlParams){
            params.set(key, this.urlParams[key].id ? this.urlParams[key].id: this.urlParams[key]);
        }
    }
    params.set("username", this.username);
    params.set("api_key", this.api_key);
    params.set("format", "json");
    return params.toString();
  }

  toString(){
    return '/api/v1/'+this.resource_name + this.id + "?" + this.getQueryString();
  }
}


@Injectable()
export class Api {
  constructor(private http: Http){}

  preprocess_url(url: any) {
    return new Url(url).toString();
  }
  request(url: any, options?: any): Observable<Response> {
    return this.http.request(this.preprocess_url(url), options);
  }
  get(url: any, options?: any): Observable<Response> {
    return this.http.get(this.preprocess_url(url), options);
  }
  post(url: any, body, options?: any): Observable<Response> {
    return this.http.post(this.preprocess_url(url), body, options);
  }
  put(url: any, body, options?: any): Observable<Response> {
    if("id" in url && !url.id){
      url.id = "";
    }
    return this.http.put(this.preprocess_url(url), body, options);
  }
  delete(url: any, options?: any): Observable<Response> {
    return this.http.delete(this.preprocess_url(url), options);
  }
  patch(url: any, body, options?: any): Observable<Response> {
    return this.http.patch(this.preprocess_url(url), body, options);
  }
  head(url: any, options?: any): Observable<Response> {
    return this.http.head(this.preprocess_url(url), options);
  }
}
