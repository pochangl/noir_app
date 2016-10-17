import {Pipe} from "@angular/core";
@Pipe({
  name: "selected"
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
  name: "orderBy"
})
export class OrderByPipe {
  transform(array: Array<Object>, field: string): Array<Object> {
    var direction;
    if(field[0] == '-'){
      direction = 1;
      field = field.substring(1);
    }else{
      direction = -1;
    }
    array.sort((a: any, b: any) => {
      return a[field] > b[field] ? direction : 0;
    });
    return array;
  }
}
