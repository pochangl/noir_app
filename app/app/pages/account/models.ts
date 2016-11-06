import { Model } from '../../model';

export class Contact extends Model{
  name: string
  construct(obj: any){
    this.name = obj.name
  }
}

export class Employee extends Model{
  contact: Contact
  construct(obj: any){
    this.contact = new Contact(obj.contact)
  }
}
