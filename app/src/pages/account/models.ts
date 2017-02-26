import { Model, ModelList } from '../../model';

export class Contact extends Model {
  resource_name = 'account/contact';
  fields = ['name', 'title', 'address', 'phone', 'mobile', 'ssn', 'birthday'];
  name: string;
  title: string;
  address: string;
  phone: number;
  mobile: number;
  ssn: string;
  birthday: string;
}

export class Employee extends Model {
  resource_name = 'account/employee';
  fields = ['is_active', {
    name: 'contact',
    cls: Contact
  }];
  is_active: boolean;
  contact: Contact;
}

export class EmployeeList extends ModelList<Employee> {
  model = Employee;
  resource_name = 'account/employee';
}

export class Company extends Model {
  name: string;
  resource_name = 'account/company';
  fields = ['name'];
}
