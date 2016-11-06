import { Api } from './providers/api/api';
import { Http } from '@angular/http';


export abstract class ModelList{
  protected api: Api
  resource_name: string
  model_class: Model
  urlParams: Object = {}
  objects: Array<Model>

  fetch(){
    this.api.get({
      resource_name: this.resource_name,
      urlParams: this.urlParams
    }).map(
      response => response.json()
    ).subscribe(
      data => this.construct(data.objects)
    );
  }
  construct(objs: Array<Object>){
    this.objects = this.objects.map(item => new this.model_class(item));
  }
}

export abstract class Model{
  protected api: Api
  protected id: number
  resource_name: string
  constructor(obj: any){
    this.id = obj.id
    this.construct(obj)
  }
  abstract construct(obj: Object)
  fetch(){
    this.api.get({
      resource_name: this.resource_name,
      id: this.id
    }).map(
      response => response.json()
    ).subscribe(
      data => this.construct(data)
    );
  }
}
