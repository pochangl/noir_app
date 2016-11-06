import { Model } from '../../model';

export class Contact extends Model{
  id: number
  name: string
}

export class Employee extends Model{
  contact: Contact
}
