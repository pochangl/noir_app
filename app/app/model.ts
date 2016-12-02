import { Api } from './providers/api/api';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

export abstract class Model {
  fields: Array<any> = [];
  id: number = 0;
  resource_name: string;
  is_removed: boolean = false;
  id_alias: string = 'id';

  constructor (protected api: Api) {
  }

  construct (obj?: any) {
    var cls;
    this[this.id_alias] = obj[this.id_alias];
    for (let item of this.fields) {
      if (!(item.name in obj || item in obj)) {
        continue;
      }
      if (typeof item === 'string') {
        name = item;
        this[name] = obj[name];
      } else if (obj[item.name] instanceof item.cls) {
        this[item.name] = obj[item.name];
      } else {
        name = item.name;
        cls = item.cls;
        this[name] = new cls(this.api);
        this[name].construct(obj[name]);
      }
    }
    return this;
  }
  fetch(): Promise<any> {
    var promise = new Promise<any>(
      (resolve, reject) => {
        this.api.get({
          resource_name: this.resource_name,
          id: this[this.id_alias]
        }).map(
          response => response.json()
        ).subscribe(
          data => {
            this.construct(data);
            resolve (this);
          }
        );
      }
    );
    return promise;
  }
  serialize (): Object {
    /*
    convert model to javascript object
    ModelList is skipped
    */
    var obj = {};
    if (this[this.id_alias]) {
      obj['id'] = this[this.id_alias];
    }
    for (let field of this.fields) {
      if (typeof field === 'string') {
        obj[field] = this[field];
      } else {
        var name = field.name;
        if (!(this[name] instanceof ModelList)) {
          obj[name] = this[name].build_url();
        }
      }
    }

    return obj;
  }
  build_url (): string {
    return this.api.build_url({
      resource_name: this.resource_name,
      id: this[this.id_alias]
    });
  }
  create(): Promise<any> {
    var promise = new Promise<any>(
      (resolve, reject) => {
        this.api.post({
            resource_name: this.resource_name
          }, this.serialize()
        ).map(
          resp => resp.json()
        ).subscribe(
          data => {
            this.construct(data);
            resolve(this);
          }
        );
      }
    );
    return promise;
  }
  update (): Promise<any> {
    var promise = new Promise<any>((resolve, reject) => {
      this.api.put({
          resource_name: this.resource_name,
          id: this[this.id_alias]
        }, this.serialize()
      ).map(
          resp => resp.json()
      ).subscribe(
        data => {
          this.construct(data);
          resolve(this);
        }
      );
    });
    return promise;
  }
  commit () {
    /*
      update information to server
      if no this[this.id_alias], read in id after obj creation
    */
    if (!this[this.id_alias]) {
      return this.create();
    } else {
      return this.update();
    }
  }
  delete (): Promise<any> {
    var promise = new Promise<any>((resolve, reject) => {
      var observable = this.api.delete({
        resource_name: this.resource_name,
        id: this[this.id_alias]
      }, this.serialize()).map(
        resp => resp.json()
      ).subscribe(
        data => resolve()
      );
    });
   return promise;
  }
}


export abstract class ModelList<T extends Model>{
  resource_name: string;
  model: any;
  objects: Array<T> = [];
  length: number;
  urlParams: Object = {};

  constructor (protected api: Api) {
    this.construct([]);
  }
  construct (objs) {
    this.objects = objs.map(
      obj => {
        var new_obj = new this.model(this.api);
        return new_obj.construct(obj);
      }
    );
    this.length = this.objects.length;
  }
  buildUrlParams () {
    return this.urlParams;
  }
  fetch (): Promise<ModelList<T>> {
    var promise = new Promise<ModelList<T>>(
      (resolve, reject) => {
        this.api.get({
          resource_name: this.resource_name,
          urlParams: this.buildUrlParams()
        }).map(
          response => response.json()
        ).subscribe(
          data => {
            this.construct(data.objects);
            resolve(this);
          }
        );
      }
    );
    return promise;
  }
  filter (kwargs: Object): this {
    this.urlParams = kwargs;
    return this;
  }
  find(item: T): Array<T> {
    return this.objects.filter( a => a.id === item.id );
  }
  has (item: T): boolean {
    return this.find(item).length > 0;
  }
  remove (item: T): void {
    this.objects = this.objects.filter( a => a.id !== item.id);
  }
  add (item: T, duplicate?: boolean): void {
    if (duplicate || !this.has(item)) {
      this.objects.push(item);
    }
  }
}


export abstract class APIDate extends Model {
  fields = ['date'];
  date: string;
}

export abstract class APIDateList extends ModelList<APIDate> {
  model = APIDate;
}

export abstract class JunctionModel extends Model {
  junction_fields: Array<any>;
  fetch (): Promise<JunctionModel> {
    var filter = {};
    for (let name of this.junction_fields) {
      for (let field of this.fields) {
        if (field.name === name) {
          filter[name] = this[name].id;
          break;
        }
      }
    }
    var promise = new Promise<JunctionModel>(
      (resolve, reject) => {
        this.api.get({
          resource_name: this.resource_name,
          urlParams: filter
        }).map(
          response => response.json()
        ).subscribe(
          data => {
            this[this.id_alias] = data[this.id_alias];
            resolve(this);
          }
        );
      }
    );
    return promise;
  }
}
