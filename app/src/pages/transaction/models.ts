import { Model, ModelList } from '../../model';
import { Employee } from '../account/models';


export class BaseAccountBalance extends Model {
  resource_name = 'transaction/base_account_balance';
  fields = [
    'balance', 'income', 'expense', 'note', 'date', 'to_date'
  ];
  balance: number;
  income: number;
  expense: number;
  note: string;
  date: string;

  settle_all_records () {
    this.api.put({
      resource_name: 'transaction/settle_account',
      id: 1
    }, this.serialize()).subscribe(()=>this.fetch);
  }
}


export class PersonalAccountBalance extends Model {
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

export class PersonalAccountBalanceList extends ModelList<PersonalAccountBalance> {
  resource_name = 'transaction/settle_account';
  model = PersonalAccountBalance;
}

export class MyPaycheck extends Model {
    employee: Employee
    send_data (obj) {}
}

export class MyPaycheckList extends ModelList<MyPaycheck> {
}
