import { Model, ModelList } from '../../model';
import { Employee, EmployeeList } from '../account/models';


export class DayOff extends Model {
  resource_name = 'dayoff';
  fields = [
    'start_datetime', 'end_datetime',
    'start_date', 'end_date',
    'start_time', 'end_time',
    {
      name: 'employee',
      cls: Employee
    }
  ];
  start_datetime: string;
  end_datetime: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  employee: Employee;

  isValidDateTime (dayoff) {
    if (dayoff.start_datetime < dayoff.end_datetime) {
      return true;
    } else {
      return false;
    }
  }
}

export class DayOffList extends ModelList<DayOff> {
  resource_name = 'dayoff';
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
