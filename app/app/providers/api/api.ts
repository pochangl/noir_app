import { Injectable } from '@angular/core';
import { Http, URLSearchParams , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import * as cookie from './cookie';


/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

class APIUrl {
    id: string;
    resource_name: string;
    urlParams: Object;
    constructor(kwargs: {
      id?: string,
      resource_name: string,
      urlParams?: Object,
    }, force_id = false) {
      this.id = (!!kwargs.id || kwargs.id === '') ? kwargs.id + '/' : '';
      this.id = (this.id === '' && force_id) ? '/' : this.id;
      this.resource_name = kwargs.resource_name + '/';
      this.urlParams = kwargs.urlParams ? kwargs.urlParams : {};
    }
    toString () {
      return '/api/v1/' + this.resource_name + this.id;
    }
}

export class AuthenticatedUrl extends APIUrl {
  api_key: string;
  username: string;
  constructor(kwargs: {
    'id'?: string,
    'resource_name': string,
    'urlParams'?: Object,
  }, force_id = false) {
    super(kwargs, force_id);
    this.username = 'edward';
    this.api_key = '123';
  }

  getQueryString () {
    var params = new URLSearchParams('');
    if (!!this.urlParams) {
        for (var key in this.urlParams) {
            params.set(key, this.urlParams[key].id ? this.urlParams[key].id : this.urlParams[key]);
        }
    }
    params.set('username', this.username);
    params.set('api_key', this.api_key);
    params.set('format', 'json');
    return params.toString();
  }

  toString () {
    return '/api/v1/' + this.resource_name + this.id + '?' + this.getQueryString();
  }
}


@Injectable()
export class Api {
  constructor(private http: Http) {}

  preprocess_url (url: any, force_id: boolean = false): string {
    return new AuthenticatedUrl(url, force_id).toString();
  }
  build_url (url: any): string {
    return new APIUrl(url).toString();
  }
  csrf () {
    let csrfToken = cookie.parse(document.cookie).csrftoken;
    let headers = new Headers({'X-CSRFToken': csrfToken});
    let options = new RequestOptions({headers: headers});
    return options;
  }
  request (url: any, options?: any): Observable<Response> {
    return this.http.request(this.preprocess_url(url), options);
  }
  get(url: any, options?: any): Observable<Response> {
    return this.http.get(this.preprocess_url(url), options);
  }
  post (url: any, body, options?: any): Observable<Response> {
    return this.http.post(this.preprocess_url(url), body, this.csrf());
  }
  put (url: any, body, options?: any): Observable<Response> {
    return this.http.put(this.preprocess_url(url, true), body, this.csrf());
  }
  delete (url: any, options?: any): Observable<Response> {
    url.id = url.id ? url.id : -1; // prevent deleting the entire database
    return this.http.delete(this.preprocess_url(url));
  }
  patch(url: any, body, options?: any): Observable<Response> {
    return this.http.patch(this.preprocess_url(url), body, options);
  }
  head(url: any, options?: any): Observable<Response> {
    return this.http.head(this.preprocess_url(url), options);
  }
}
