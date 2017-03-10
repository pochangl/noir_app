import { Model, ModelList} from '../../model';
import { Employee} from '../account/models';

export class DayOff extends Model {
  resource_name = 'schedule/dayoff';
  fields = [
    'start_datetime', 'end_datetime', 'id',
    {
      name: 'employee',
      cls: Employee
    }
  ];
  start_datetime: string;
  end_datetime: string;
  employee: Employee;

  get start_date () {
    return this.start_datetime.split('T')[0]
  }
  get end_date () {
    return this.end_datetime.split('T')[0]
  }

  add (start_date: string, employee: Employee) {
    var ea = new DayOff(this.api);
    ea.start_datetime = start_date + 'T' + '08:00:00';
    ea.end_datetime = start_date + 'T' + '17:00:00';
    ea.employee = employee;
    return ea.commit();
  }
}

export class DayOffList extends ModelList<DayOff> {
  resource_name = 'schedule/dayoff';
  model = DayOff;
}

export class MyDayOffList extends DayOffList {
  employee: Employee;
  set_employee (employee: Employee) {
    this.employee = employee;
  }
  buildUrlParams () {
    var params = super.buildUrlParams();
    params['employee'] = this.employee.id;
    return params;
  }
}
