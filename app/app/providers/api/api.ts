import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api {
  constructor(private http: Http) {
  }

  preprocess_url(url: string) {
    /** var path = URL.parse(url_string, true);
    path.query["api_key"] = localStorage["api_key"];
    path.query["username"] = localStorage["username"];
    return Url.format(path);
    **/
    return url;
  }
  request(url: string, options?: any) {
    return this.http.request(this.preprocess_url(url), options);
  }
  get(url: string, options?: any) {
    return this.http.get(this.preprocess_url(url), options);
  }
  post(url: string, body, options?: any) {
    return this.http.post(this.preprocess_url(url), body, options);
  }
  put(url: string, body, options?: any) {
    return this.http.put(this.preprocess_url(url), body, options);
  }
  delete(url: string, options?: any) {
    return this.http.delete(this.preprocess_url(url), options);
  }
  patch(url: string, body, options?: any) {
    return this.http.patch(this.preprocess_url(url), body, options);
  }
  head(url: string, options?: any) {
    return this.http.head(this.preprocess_url(url), options);
  }
}

