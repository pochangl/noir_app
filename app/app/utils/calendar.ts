import { Model, ModelList } from '../model';
import { Iterator } from './iterator';
import { Api } from '../providers/api/api';


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
      this[this.childName] = [];
      var childs = obj[this.childName];
      for (var index in childs) {
        var child = childs[index];
        var value = this.build_child_value(child, index);
        var node = new this.ChildClass(value);
        node.construct(child, this);
        this[this.childName].push(node);
      }
    }
  }
}

class Day extends TreeNode {
  parentName = 'week';
  build_child_value () {}
}

class Week extends TreeNode {
  parentName = 'month';
  childName = 'days';
  ChildClass: Day;

  build_child_value (child, index) {
    return child;
  }
}

class Month extends TreeNode {
  childName = 'weeks';
  ChildClass: Week;

  build_child_value (child, index) {
    return index + 1;
  }
}


class Year extends TreeNode {
  parentName = 'calendar';
  childName = 'monthes';
  ChildClass: Month;

  build_child_value (child, index) {
    return index + 1;
  }
}


class Calendar extends Model {
  model = Month;
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
    this.loadYear(year).then(calendar => {
      this.value = calendar.years[this.year].monthes[this.month];
    });
    this.loadYear(year + 1);
    this.loadYear(year - 1);
  }
  get () {
    this.value = this.calendar.years[this.year].monthes[this.month];
    return this.value;
  }
  next () {
    if (this.month >= 12) {
      this.year ++;
      this.month = 1;
    }
    if (!this.calendar.years[this.year + 1]) {
      this.loadYear(this.year + 1);
    }
  }
  prev () {
    if (this.month <= 1) {
      this.year --;
      this.month = 12;
    }
    if (!this.calendar.years[this.year - 1]) {
      this.loadYear(this.year - 1);
    }
  }

}
