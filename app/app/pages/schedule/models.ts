import { Model, ModelList } from '../../model';
import { Employee, EmployeeList } from '../account/models';

export class DayOff extends Model{
  resource_name = "dayoff"
  fields = [
    "start_datetime", "end_datetime",
    "start_date", "end_date",
    "start_time", "end_time",
    {
      name: "employee",
      cls: Employee
    }
  ]
  start_datetime: string
  end_datetime: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  employee: Employee

  isValidDateTime(){
		// this.dayoffs.start_datetime = this.dayoffs.start_date.concat(this.dayoffs.start_datetime.substring(10));
		// this.dayoffs.start_datetime = this.dayoffs.start_datetime.substring(0,11).concat(this.dayoffs.start_time);
		// this.dayoffs.end_datetime = this.dayoffs.end_date.concat(this.dayoffs.end_datetime.substring(10));
		// this.dayoffs.end_datetime = this.dayoffs.end_datetime.substring(0,11).concat(this.dayoffs.end_time);
    // return this.start_datetime < this.end_datetime;
    console.log("isValidDateTime works");
    return false;
  }
}

  export class DayOffList extends ModelList<DayOff>{
    resource_name = "dayoff"
    model = DayOff
  }

  export class MyDayOffList extends DayOffList{
    employee: Employee
    set_employee(employee: Employee){
      this.employee = employee;
    }
    buildUrlParams(){
      var params = super.buildUrlParams();
      params["employee"] = this.employee.id;
      return params;
    }
  }
