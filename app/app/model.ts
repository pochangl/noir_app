import { Api } from './providers/api/api';
import { Http } from '@angular/http';


export abstract class Model{
  protected api: Api
  protected id: number
  constructor(obj: any){
    id = obj.id
    this.construct(obj)
  }
  abstract construct(obj: Object)
  abstract fetch()
}
