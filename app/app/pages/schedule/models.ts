import { Model } from '../../model';
import { Employee } from '../account/models';
import { Api } from '../../providers/api/api';
import { Injectable } from '@angular/core';

@Injectable()
export class DayOffService extends Model{
  id: number
  start_datetime: string
  end_datetime: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  // employees: Array<any>

  constructor(
    obj: any
  ){
    super(obj)
    this.construct(obj)
  }
  construct(obj: any){
    this.id = obj.id
    this.start_datetime = obj.start_datetime
    this.end_datetime = obj.end_datetime
    this.start_date = obj.start_date
    this.end_date = obj.end_date
    this.start_time = obj.start_time
    this.end_time = obj.end_time
    // this.employees = obj.employees.map(employee=>new Employee(employee))
    // this.employees = new Employee(obj.employee)
  }
  fetch(){
    // this.api.get({
    //   resource_name: "dayoff"
    // }).map(
    //   response => response.json()
    // ).subscribe(
    //   data =>{
    //     this.construct(data)
    //   }
    // );
  }
  update(){
  }
  navi(){
  }
  isDateTimeOk(){
		// this.dayoffs.start_datetime = this.dayoffs.start_date.concat(this.dayoffs.start_datetime.substring(10));
		// this.dayoffs.start_datetime = this.dayoffs.start_datetime.substring(0,11).concat(this.dayoffs.start_time);
		// this.dayoffs.end_datetime = this.dayoffs.end_date.concat(this.dayoffs.end_datetime.substring(10));
		// this.dayoffs.end_datetime = this.dayoffs.end_datetime.substring(0,11).concat(this.dayoffs.end_time);
    // return this.start_datetime < this.end_datetime;
    return false;
  }
}
