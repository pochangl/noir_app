import { Model, ModelList } from '../../model';
import { Employee } from '../account/models';

export class PersonalAccountBalnace extends Model {
  resource_name = 'transaction/personal_account_balance';
  fields = [
    'balance', 'income', 'expense', 'note', 'date',
    {
      name: 'employee',
      cls: Employee
    }
  ];
  balance: number;
  income: number;
  expense: number;
  note: string;
  date: string;
  employee: Employee;
}

export class PersonalAccountBalnaceList extends ModelList<PersonalAccountBalnace> {
  resource_name = 'transaction/personal_account_balance';
  model = PersonalAccountBalnace;
}
export class MyPaycheck extends Model {
    employee: Employee
    send_data (obj) {}
}
export class MyPaycheckList extends ModelList<MyPaycheck> {
}
// export class MyPaycheck extends Paycheck {
//
//   set_employee(employee: Employee) {
//     this.employee = employee;
//   }
//   send_data(employee: Employee) {
//     return new Promise<any>((resolve, reject) => {
//       this.construct({
//         employee: this.employee,
//       });
//       this.commit().then(
//         obj => {
//           resolve(this.employee);
//           this.set_employee(this.employee);
//         }
//       );
//     });
//   }
// }
//
// export class MyPaycheckList extends PaycheckList {
//   employee: Employee;
//   set_employee(employee: Employee) {
//     this.employee = employee;
//   }
//   buildUrlParams () {
//     var params = super.buildUrlParams();
//     params['employee'] = this.employee.id;
//     return params;
//   }
// }
