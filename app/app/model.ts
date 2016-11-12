import { Api } from './providers/api/api';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export abstract class Model{
  protected api: Api
  protected id: number
  constructor(obj: any){
    this.id = obj.id
    this.construct(obj)
  }
  abstract construct(obj: Object)
  abstract fetch()
}
