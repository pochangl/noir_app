import { Model } from '../../model';
import { Injectable } from '@angular/core';


@Injectable()
export class Contact extends Model{
  protected name: string
  title: string
  address: string
  phone: number
  mobile: number
  pid: string
  birthday: string

  constructor(obj: any){
    super(obj)
    this.construct(obj)
  }

  construct(obj: any){
    name = obj.name
    this.title = obj.title
    this.address = obj.address
    this.phone = obj.phone
    this.mobile = obj.mobile
    this.pid = obj.pid
    this.birthday = obj.birthday
  }
  fetch(){}
  update(){}
}

export class Employee extends Model{
  contact: Contact
  title: string

  constructor(obj: any){
    super(obj)
    this.construct(obj)
  }

  construct(obj: any){
    this.contact = new Contact(obj.contact)
    this.title = obj.title
  }
  fetch(){}
  update(){}
}
