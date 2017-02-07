import {Component, Injectable} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Api} from '../../providers/api/api';
import {ProjectDetailPage, ProjectDetailManagementPage} from './detail';
import {OrderByPipe } from '../pipes/selected_account';
import {AssignmentList, Assignment} from './models';

@Component({
    templateUrl: 'build/pages/project/list.html',
    providers: [Api],
    pipes: [OrderByPipe]
})

export class ProjectListPage {
    assignments: AssignmentList;
    selected_date: string;

    constructor(
        protected nav: NavController,
        params: NavParams,
        private api: Api
        ) {
        this.selected_date = params.data.date.date;
        this.assignments = new AssignmentList(this.api);
        this.assignments.filter({
            start_datetime: params.data.date.date
        });
    }
    ionViewWillEnter() {
        this.assignments.fetch();
    }

    click(assignment) {
        this.nav.push(ProjectDetailPage, { assignment: assignment });
    }
}
