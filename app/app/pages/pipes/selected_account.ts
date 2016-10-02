import {Pipe} from "angular2/core";
@Pipe({
  name: "selected"
})
export class SelectedPipe {
  transform(array: Array<Object>): Array<Object> {
    array.sort((a: Object, b: Object) => {
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
