import { Model, ModelList, JunctionModel, APIDateList} from '../../model';
import {AuthenticatedUrl} from '../../providers/api/api.ts';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';

export class SignIn extends AuthenticatedUrl {
  username: string;
  password: string;
  
}
