import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api'
import {ProjectDetailPage} from './detail'
import { Http } from '@angular/http';

@Component({
    templateUrl: 'build/pages/project/list.html',
    providers: [Api]
})

export class ProjectListPage {
    projects: any;
    constructor(private nav: NavController, private http: Api) {
        this.projects = [];
        this.http.get(
            '/api/v1/project/?format=json'
            ).map(response => response.json()
                ).subscribe((data) => {
                    this.projects = data.objects;
                });

    }
    click(project) {
        this.nav.push(ProjectDetailPage, { project: project });
    }
}
