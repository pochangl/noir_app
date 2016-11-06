import { Model } from '../../model';

export class Contact extends Model{
  id: number
  name: string
  fetch(){}
  update(){}
}

export class Employee extends Model{
  contact: Contact
  fetch(){}
  update(){}
}
