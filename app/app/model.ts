import { Api } from './providers/api/api';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

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
  fetch(func?: Function): Observable<Response>{
    var observable;
    observable = this.api.get({
      resource_name: this.resource_name,
      id: this.id
    }).map(
      response => response.json()
    );
    observable.subscribe(
      data => {
        this.construct(data)
        if (func){
          func()
        }
      }
    );
    return observable;
  }
  serialize():Object{
    /*
    convert model to javascript object
    ModelList is skipped
    */
    var obj = {};
    if(this.id){
      obj['id'] = this.id
    }
    for(let field of this.fields){
      if(typeof field == "string"){
        obj[field] = this[field];
      }else{
        var name = field.name;
        if(!(this[name] instanceof ModelList)){
          obj[name] = this[name].build_url();
        }
      }
    }

    return obj;
  }
  build_url(): string{
    return this.api.build_url({
      resource_name: this.resource_name,
      id: this.id
    })
  }
  create(): Observable<Response>{
    return this.api.post({
        resource_name: this.resource_name
      }, this.serialize()
    )
  }
  update(): Observable<Response>{
    return this.api.put({
        resource_name: this.resource_name,
        id: this.id
      }, this.serialize()
    )
  }
  commit(){
    /*
      update information to server
      if no this.id, read in id after obj creation
    */
    if(!this.id){
      return this.create();
    } else {
      return this.update();
    }
  }
  delete(): Observable<Response>{
    var observable = this.api.delete({
     resource_name: this.resource_name
   }, this.serialize());
   observable.subscribe();
   return observable;
  }
}


export abstract class ModelList<T extends Model>{
  resource_name: string
  model: any
  objects: Array<T> = []
  length: number
  urlParams: Object = {}

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
    return this.urlParams;
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
  filter(kwargs: Object): this{
    this.urlParams = kwargs;
    return this;
  }
  find(item: T): Array<T>{
    return this.objects.filter( a => a.id === item.id )
  }
  has(item: T): boolean{
    return this.find(item).length > 0;
  }
  remove(item: T): void{
    this.objects = this.objects.filter( a => a.id != item.id)
  }
  add(item: T, duplicate?:boolean): void{
    if (duplicate || !this.has(item)){
      this.objects.push(item)
    }
  }
}


export abstract class APIDate extends Model{
  fields = ["date"]
  date: string
}

export abstract class APIDateList extends ModelList<APIDate> {
  model = APIDate
}
