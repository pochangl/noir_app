import { Model, ModelList, JunctionModel, APIDateList} from '../../model';
import { Employee, EmployeeList } from '../account/models';

import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';


export class DayOff extends Model {
  resource_name = 'dayoff';
  fields = [
    'start_datetime', 'end_datetime',
    'start_date', 'end_date',
    'start_time', 'end_time', 'id',
    {
      name: 'employee',
      cls: Employee,
      is_url: true
    }
  ];
  start_datetime: string;
  end_datetime: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  employee: Employee;
  employees: EmployeeList;

  add (start_date: string, employee: Employee) {
    var ea = new DayOff(this.api);
    ea.construct({
      start_datetime: start_date + 'T' + '08:00:00',
      end_datetime: start_date + 'T' + '17:00:00',
      employee: employee
    });
    ea.commit();
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
