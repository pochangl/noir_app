import { Model, ModelList } from './model';


abstract class TreeNode {
  name: string
  childName: string
  ChildClass: any
  parentName: string

  constructor(value){
    this[this.name] = value
  }
  abstract build_child_value (child, index)
  construct (parent: TreeNode, childs, value) {
    this[this.parentName] = parent
    if (this.ChildClass) {
      this[this.childName] = []
      for (var index in childs) {
        var child = childs[index]
        var value = this.build_child_value(child, index)
        var node = new this.ChildClass()
        node.construct(this, child, value)
        this[this.childName].push(node)
      }
    }
  }
}

export class Day extends TreeNode {
  name = "day"
  parentName = "week"
  build_child_value () {}
}

export class Week extends TreeNode {
  name = "week"
  parentName = "month"
  childName = "days"
  ChildClass: Day

  build_child_value (child, index) {
    return child
  }
}

export class Month extends TreeNode {
  name = "month"
  parentName = "year"
  childName = "weeks"
  ChildClass: Week

  build_child_value (child, index) {
    return index + 1
  }
}


export class Year extends TreeNode {
  name = "year"
  parentName = "calendar"
  childName = "monthes"
  ChildClass: Month

  build_child_value (child, index) {
    return index + 1
  }
}


export class Calendar extends Model{
  model = Month
  resource_name = "calendar"
  year: number
  monthes: Array<Month>
  id_alias = "year"

  construct (obj) {


    for (let mon of objs) {

    }
    return this
  }
}
