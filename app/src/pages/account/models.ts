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

  new_contact (contact: Contact) {
    let new_contact = new Contact(this.api);
    new_contact.id = this.id;
    new_contact = this;
    let new_employee = new Employee(this.api);
    new_employee.id = this.id;
    new_employee.contact.id = this.id;
    new_employee.is_active = true;
    return new Promise<any>((resolve, reject) => {
      new_contact.create().then(() => {
      }).catch(() => {
        reject();
      });
    });
  }
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
  is_active: boolean;
  resource_name = 'account/company';
  fields = ['name', 'is_active'];
}

export class CompanyList extends ModelList<Company> {
  model = Company;
  resource_name = 'account/company';
}
