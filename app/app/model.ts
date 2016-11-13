import { Api } from './providers/api/api';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';


export abstract class ModelList<T>{
  resource_name: string
  model: any
  objects: Array<T> = []
  length: number

  constructor(protected api:Api){
    this.construct([]);
  }
  construct(objs){
    this.objects = objs.map(obj=>{
      var new_obj = new this.model(this.api);
      return new_obj.construct(obj);
    });
    this.length = this.objects.length;
  }
  buildUrlParams(){
    return {};
  }
  fetch(): Observable<Response>{
    var observable = this.api.get({
      resource_name: this.resource_name,
      urlParams: this.buildUrlParams()
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

  constructor(protected api: Api){
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
        this[name] = new cls(this.api)
        this[name].construct(obj[name])
      }
    }
    return this;
  }
  fetch(): Observable<Response>{
    var observable;
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
  commit(){

  }
  update(){
  }
  create(){

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
  fetch(): Observable<Response>{
    var observable;
    if(!this.id){
      return this.get_id();
    }else{
      return super.fetch();
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
