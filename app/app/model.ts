import { Api } from './providers/api/api';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';


export abstract class ModelList<T>{
  resource_name: string
  model: any
  urlParams: Object = {}
  objects: Array<T> = []
  length: number
  api: Api

  constructor(objs: Array<Object> = []){
    this.construct(objs);
  }
  construct(objs){
    console.log(objs);
    this.objects = objs.map(obj=>{
      var new_obj = new this.model();
      return new_obj.construct(obj);
    });
    this.length = this.objects.length;
  }
  fetch(api?: Api): Observable<Response>{
    this.api = api;
    var observable = this.api.get({
      resource_name: this.resource_name,
      urlParams: this.urlParams
    }).map(
      response => response.json()
    );
    observable.subscribe(
      data => {
        this.construct(data.objects);
      }
    );
    return observable;
  }
}

export abstract class Model{
  fields: Array<any> = []
  protected id: number
  resource_name: string
  is_removed: boolean = false

  constructor(protected api?: Api){
  }
  construct(obj?: any){
    var cls;
    this.id = obj.id
    for(let item of this.fields){
      if(!(item in obj || item.name in obj)){
        continue;
      }
      if(typeof item == "string"){
        name = item;
        this[name] = obj[name];
      }else{
        name = item.name;
        cls = item.cls;
        this[name] = new cls()
        this[name].construct(obj[name])
      }
    }
    return this;
  }
  fetch(api?: Api): Observable<Response>{
    var observable;
    this.api = api;
    observable = this.api.get({
      resource_name: this.resource_name,
      id: this.id
    }).map(
      response => response.json()
    );
    observable.subscribe(
      data => this.construct(data)
    );
    return observable;
  }
  delete(): Observable<Response>{
    var observable = this.api.delete({
      resource_name: this.resource_name,
      id: this.id
    });
    return observable;
  }
}

export abstract class JunctionModel extends Model{
  junction_fields: Array<string>
  fetch(api?: Api): Observable<Response>{
    var observable;
    this.api = api;
    if(!this.id){
      return this.get_id();
    }else{
      return super.fetch(api);
    }
  }
  get_id(){
    var observable = this.api.get({
      resource_name: this.resource_name
    }).map(
      resp => resp.json()
    );
    observable.subscribe(
      data => this.id = data.id,
      err => this.is_removed = true
    );
    return observable;
  }
  delete(): Observable<Response>{
    var observable = this.fetch();
    observable.subscribe(
      data => this.is_removed = true
    );
    return observable;
  }
  build_post_data(): Object{
    var data = {};
    for(let field of this.junction_fields){
      data[field] = this[field].id;
    }
    return data;
  }
  create(): Observable<Response>{
    var observable = this.api.post({
      resource_name:this.resource_name,
    }, this.build_post_data());
    observable.map(resp => resp.json).subscribe(
      item => this.id = item["id"]
    );
    return observable
  }
}
