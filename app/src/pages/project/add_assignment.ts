import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Api} from '../../providers/api/api';
import {Assignment, ProjectList} from './models';

@Component({templateUrl: 'add_assignment.html',providers: [Api]})
export class AddAssignmentPage {
    assignment: Assignment;
    projects: ProjectList;

    constructor(
        protected nav: NavController,
        private api: Api
        ) {
        this.projects = new ProjectList(this.api);
        this.assignment = new Assignment(this.api);
    }

    ionViewWillEnter () {
      this.projects.fetch();
      this.assignment.fetch();
    }

    add () {
      console.log(this.assignment);
      this.assignment.create().then(() => {
        this.nav.pop();
      });
    }
}
