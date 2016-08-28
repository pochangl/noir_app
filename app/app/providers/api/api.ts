import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

class Url{
  id: string;
  resource_name: string;
  urlParams: any;
  //urlParams_key: string;
  //urlParams_value: string;
  api_key: string;
  username: string;
  constructor(kwargs: {
    "id"?: string,
    "resource_name": string,
    "urlParams"?: {"key": "value"}
  }){
    this.id = kwargs.id ? kwargs.id + "/": "";
    this.resource_name= kwargs.resource_name + "/";
    if(kwargs.urlParams == null ) {
      this.urlParams = null;
    }
    else{
      //this.urlParams_key = kwargs.urlParams.key;
      //this.urlParams_value = kwargs.urlParams.contact.id;
      this.urlParams = kwargs.urlParams;
    }
    this.username = "edward";
    this.api_key = "1c62cc576c1e505f82521ff373ce0f860b21e71a";

  }
  getQueryString(){
    var params = new URLSearchParams("");
    if (this.urlParams !== null) {
      params.set(this.urlParams, this.urlParams.employee.contact.id);
      console.log(this.urlParams.employee);    //object
      console.log(this.urlParams.employee.contact.id);    //2
      console.log(this.urlParams.objects);    //undefined
      console.log(this.urlParams.object);    //undefined
      console.log(this.urlParams.keys);    //undefined
      console.log(this.urlParams.key);    //undefined
      console.log(this.urlParams.id);    //undefined
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
  constructor(private http: Http) {}

  preprocess_url(url: any) {
    return new Url(url).toString();
  }
  request(url: any, options?: any) {
    return this.http.request(this.preprocess_url(url), options);
  }
  get(url: any, options?: any) {
    return this.http.get(this.preprocess_url(url), options);
  }
  post(url: any, body, options?: any) {
    return this.http.post(this.preprocess_url(url), body, options);
  }
  put(url: any, body, options?: any) {
    return this.http.put(this.preprocess_url(url), body, options);
  }
  delete(url: any, options?: any) {
    return this.http.delete(this.preprocess_url(url), options);
  }
  patch(url: any, body, options?: any) {
    return this.http.patch(this.preprocess_url(url), body, options);
  }
  head(url: any, options?: any) {
    return this.http.head(this.preprocess_url(url), options);
  }
}
