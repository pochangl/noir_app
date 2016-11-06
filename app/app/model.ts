import { Api } from './providers/api/api';
import { Http } from '@angular/http';


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
