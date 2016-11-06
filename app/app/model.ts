import { Api } from './providers/api/api';
import { Http } from '@angular/http';


export abstract class ModelList<T>{
  resource_name: string
  urlParams: Object = {}
  objects: Array<T>
  api: Api

  constructor(obj?: Array<Object>){
    if(obj){
      this.construct(obj)
    }else{
      this.construct([]);
    }
  }

  fetch(api){
    this.api = api;
    this.api.get({
      resource_name: this.resource_name,
      urlParams: this.urlParams
    }).map(
      response => response.json()
    ).subscribe(
      data => this.construct(data.objects)
    );
  }
  abstract construct(objs: Array<Object>)
}

export abstract class Model{
  protected id: number
  resource_name: string
  api: Api
  constructor(obj: any){
    this.id = obj.id;
    this.construct(obj);
  }
  fetch(api: Api){
    this.api = api;
    this.api.get({
      resource_name: this.resource_name,
      id: this.id
    }).map(
      response => response.json()
    ).subscribe(
      data => this.construct(data)
    );
  }
  abstract construct(obj: Object) // 從原始資料建立Model
}
