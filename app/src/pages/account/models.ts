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

  add (contact: Contact) {
    let new_contact = new Contact(this.api);
    new_contact.id = this.id;
    new_contact.name = this.name;
    new_contact.title = this.title;
    new_contact.address = this.address;
    new_contact.phone = this.phone;
    new_contact.mobile = this.mobile;
    new_contact.ssn = this.ssn;
    new_contact.birthday = this.birthday;
    return new Promise<any>((resolve, reject) => {
      new_contact.create().then(() => {
        this.add(contact);
        this.fetch();
        resolve(new_contact);
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
