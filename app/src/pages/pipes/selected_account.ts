import {Pipe} from '@angular/core';

@Pipe({
  name: 'selected'
})
export class SelectedPipe {
  transform(array: Array<Object>): Array<Object> {
    array.sort((a: any, b: any) => {
      if (a.selected) {
        return -1;
      } else if (b.selected) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe {
  transform(array: Array<Object>, field: string): Array<Object> {
    var direction;
    if (field[0] === '-') {
      direction = -1;
      field = field.substring(1);
    } else {
      direction = 1;
      field = field;
    }
    array.sort((a: any, b: any) => {
      if (direction === -1) {
        return a[field] > b[field] ? 0 : 1; // 1交換位置，0不交換位置，好像不吃-1
      } else {
        return a[field] > b[field] ? 1 : 0; // 1交換位置，0不交換位置
      }
    });
    return array;
  }
}
