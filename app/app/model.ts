import { Api } from './providers/api/api';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

function filterByObject (filter: Object) {
  function wrappedFunc (item: Model) {
    for (let name in filter) {
      let filter_value = filter[name];
      let item_value = item[name];
      if (filter_value instanceof Model) {
        if (!item_value.is(filter_value)) {
          return false;
        }
      } else if (filter_value instanceof Object) {
        if (!filterByObject(filter_value)(item_value)) {
          return false;
        }
      } else if (item_value !== filter_value) {
        return false;
      }
    }
    return true;
  }
  return wrappedFunc;
}

export abstract class Model {
  fields: Array<any> = [];
  id: number = 0;
  resource_name: string;
  is_removed: boolean = false;
  id_alias: string = 'id';

  get Class () {
    return this.constructor;
  }
  constructor (public api: Api) {
  }

  construct (obj?: any) {
    if (!obj) {
      return;
    }
    let cls = undefined;
    if (typeof obj === 'string') {
      let decompose = obj.split('/');
      let id = parseInt(decompose[decompose.length - 2]);
      this.id = id;
      return this;
    }
    this.id = obj.id;
    for (let field of this.fields) {
      if (!(field.name in obj || field in obj)) {
        continue;
      }
      let name = field;
      if (typeof field === 'string') {
        this[name] = obj[name];
      } else if (obj[field.name] instanceof field.cls) {
        this[field.name] = obj[field.name].build_url();
      } else if (field.is_url) {
        this[name] = obj[name];
      } else {
        name = field.name;
        cls = field.cls;
        this[name] = new cls(this.api);
        this[name].construct(obj[name]);
      }
    }
    return this;
  }
  build_url_obj (): any {
    return {
      resource_name: this.resource_name,
      id: this.id
    };
  }
  get url_obj () {
    return this.build_url_obj();
  }
  build_url (): string {
    return this.api.build_url(this.url_obj);
  }
  fetch (): Promise<any> {
    var promise = new Promise<any>(
      (resolve, reject) => {
        this.api.get(this.url_obj).map(
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
    if (this.id) {
      obj['id'] = this.id;
    }
    for (let field of this.fields) {
      if (typeof field === 'string') {
        obj[field] = this[field];
      } else if (field.is_url) {
        if (typeof field.name === 'string') {
          obj[field.name] = this[field.name];
        } else {
          obj[field.name] = this[field.name].build_url();
        }
      } else if (this[field.name] instanceof Model) {
        obj[field.name] = this[field.name].serialize();
      }
    }
    return obj;
  }
  create (): Promise<any> {
    var promise = new Promise<any>(
      (resolve, reject) => {
        this.api.post(this.url_obj, this.serialize()).map(
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
      this.api.put(this.url_obj, this.serialize()
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
      if no this.id, read in id after obj creation
    */
    if (!this.id) {
      return this.create();
    } else {
      return this.update();
    }
  }
  delete (): Promise<any> {
    var promise = new Promise<any>((resolve, reject) => {
      var observable = this.api.delete(
        this.url_obj, this.serialize()
      ).subscribe(
        data => resolve()
      );
    });
   return promise;
  }
  is (item: any): boolean {
    if (item instanceof Model) {
      return (this.id === item.id) && (item instanceof this.Class);
    } else if (item instanceof Object) {
      return filterByObject(item)(this);
    } else {
      return false;
    }
  }
}


export abstract class ModelList<T extends Model>{
  resource_name: string;
  model: any;
  objects: Array<T> = [];
  length: number;
  urlParams: Object = {};

  constructor (public api: Api) {
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
  fetch (): Promise<any> {
    var promise = new Promise<ModelList<T>>(
      (resolve, reject) => {
        this.api.get({
          resource_name: this.resource_name,
          urlParams: this.buildUrlParams()
        }).map(
          response => response.json()
        ).subscribe(
          data => {
            this.construct(data.objects || data);
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
  search (kwargs: Object): Array<T> {
    return this.objects.filter(
      obj => {
        for (let key in kwargs) {
          if (kwargs[key] !== obj[key]) {
            return false;
          }
        }
        return true;
      }
    );
  }
  find(item: Object): Array<T> {
    return this.objects.filter( a => a.is(item));
  }
  has (item: Object): boolean {
    return this.find(item).length > 0;
  }
  remove (item: Object): void {
    this.objects = this.objects.filter( a => a.is(item));
  }
  add (item: T, duplicate?: boolean): void {
    if (duplicate || !this.has(item)) {
      this.objects.push(item);
    }
  }
  serialize () {
    return this.objects.map(model => model.serialize());
  }
}

export abstract class IndirectModelList <T extends Model> extends ModelList<T> {
  id: number = 0;
  construct (objs) {
    if (objs instanceof Array) {
      super.construct(objs);
    } else if (objs instanceof Model) {
      this.api = objs.api;
      this.id = objs.id;
    }
  }
  fetch (): Promise<any> {
    var promise = new Promise<ModelList<T>>(
      (resolve, reject) => {
        this.api.get({
          resource_name: this.resource_name,
          urlParams: this.buildUrlParams(),
          id: this.id
        }).map(
          response => response.json()
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
          if (typeof this[name] === 'string') {
            var splits = this[name].split('/');
            filter[name] = splits[splits.length - 2];
          } else if (this[name] instanceof Model) {
            filter[name] = this[name].id;
          } else {
            throw 'wrong field type';
          }
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
            var objs = data.objects;
            if (data.objects.length) {
              this.id = data.objects[0].id;
              resolve(this);
            } else {
              reject (undefined);
            }
          }
        );
      }
    );
    return promise;
  }
}
