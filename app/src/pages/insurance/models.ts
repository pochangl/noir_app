import { Model, ModelList } from '../../model'
import { Employee as BaseEmployee } from '../account/models'

export class Employee extends BaseEmployee {
    is_insuranced: Boolean = false
}

export class Insurance extends Model {
  resource_name = 'insurance'
  date: string;
  employee: Employee;
  fields =  [
    {
      name: 'employees',
      cls: Employee
    }
  ]
}

export class InsuranceList extends ModelList<Insurance> {
  model = Insurance;
  resource_name = 'insurance/recent'
}
