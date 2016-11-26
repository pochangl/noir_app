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
  buildUrlParams(obj?: any){
    return {};
  }
  fetch(obj?: any): Observable<Response>{
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
  id: number = 0
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
      }else if(obj[item.name] instanceof item.cls){
        this[item.name] = obj[item.name]
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
  serialize():Object{
    /*
    convert model to javascript object
    ModelList is skipped
    */
    var obj = {};
    for(let field of this.fields){
      if(typeof field == "string"){
        obj[field] = this[field];
      }else{
        var name = field.name;
        if(!(this[name] instanceof ModelList)){
          obj[name] = this[name].id;
        }
      }
    }

    return obj;
  }
  commit(){
    /*
      update information to server
      if no this.id, read in id after obj creation
    */
    this.api.put({
        resource_name: this.resource_name
      },this.serialize()
    ).map(
      resp => resp.json()
    ).subscribe(
      data => this.id = data.id
    );
  }
  delete(): Observable<Response>{
    var observable = this.api.delete({
      resource_name: this.resource_name
    }, this.serialize());
    return observable;
  }
}
