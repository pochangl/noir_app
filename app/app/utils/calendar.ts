import { Model, ModelList } from '../model';
import { Iterator } from './iterator';
import { Api } from '../providers/api/api';


function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

abstract class TreeNode {
  value: any;
  name: string;
  childName: string;
  ChildClass: any;
  parentName: string;

  constructor (value) {
    this.value = value;
  }
  abstract build_child_value (child, index)
  construct (obj, parent?: TreeNode) {
    if (parent) {
      this[this.parentName] = parent;
    }
    if (this.ChildClass) {
      var childs;
      this[this.childName] = [];
      if (obj instanceof Array){
        childs = obj
      } else {
        childs = obj[this.childName];
      }
      for (var index in childs) {
        var child = childs[index];
        var value = this.build_child_value(child, parseInt(index));
        var node = new this.ChildClass(value);
        node.construct(child, this);
        this[this.childName].push(node);
      }
    }
  }
}

class Day extends TreeNode {
  parentName = 'week';
  week: Week
  build_child_value () {}
  stringify () {
    if (this.value === 0){
      throw 'empty date has no date'
    } else {
      return this.week.month.year.value + '-' + zeroFill(this.week.month.value, 2) + '-' + zeroFill(this.value, 2)
    }

  }
}

class Week extends TreeNode {
  parentName = 'month';
  childName = 'days';
  ChildClass = Day;
  month: Month
  build_child_value (child, index) {
    return child;
  }
}

class Month extends TreeNode {
  parentName = 'year'
  childName = 'weeks';
  ChildClass = Week;
  year: Year

  build_child_value (child, index) {
    return index + 1;
  }
}


class Year extends TreeNode {
  parentName = 'calendar';
  childName = 'monthes';
  ChildClass = Month;

  build_child_value (child, index) {
    return index + 1;
  }
}

class EmptyYear extends Year {
  value = 0
}

class EmptyMonth extends Month {
  value = -1
  year = new EmptyYear(0)
}


class Calendar extends Model {
  resource_name = 'calendar';
  years: any = {};
  id_alias = 'year';
  year: number;

  construct (obj) {
    if (!this.years[obj.year]) {
      this.years[obj.year] = new Year(obj.year);
      this.years[obj.year].construct(obj, this);
    }
    return this;
  }
}


export class MonthIterator extends Iterator<Month> {
  year: number;
  month: number;
  calendar: Calendar;
  constructor (http: Api) {
    super();
    this.calendar = new Calendar(http);
  }
  loadYear (year: number): Promise<Calendar> {
    this.calendar.year = year;
    var promise = new Promise<Calendar>((resolve, reject) => {
      this.calendar.fetch().then(
        calendar => {
          calendar.years[year];
          resolve(calendar);
        }
      );
    });
    return promise;
  }
  initial (year: number, month: number) {
    this.month = month;
    this.year = year
    this.loadYear(year).then(calendar => {
      this.value = calendar.years[this.year].monthes[this.month-1];
    });
    this.loadYear(year + 1);
    this.loadYear(year - 1);
  }
  get () {
    if (!this.value){
      return new EmptyMonth(-1)
    }
    this.value = this.calendar.years[this.year].monthes[this.month-1];
    return this.value;
  }
  next () {
    if (this.month >= 12) {
      this.year ++;
      this.month = 1;
    } else {
      this.month ++;
    }
    if (!this.calendar.years[this.year + 1]) {
      this.loadYear(this.year + 1);
    }
  }
  prev () {
    if (this.month <= 1) {
      this.year --;
      this.month = 12;
    } else {
      this.month --;
    }
    if (!this.calendar.years[this.year - 1]) {
      this.loadYear(this.year - 1);
    }
  }

}
