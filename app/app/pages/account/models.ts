import { Model, ModelList } from '../../model';

export class Contact extends Model {
  fields = ['name'];
  name: string;
}


export class Employee extends Model {
  resource_name = 'employee';
  fields = [{
    name: 'contact',
    cls: Contact
  }];
  contact: Contact;
}


export class EmployeeList extends ModelList<Employee> {
  model = Employee;
  resource_name = 'employee';
}
