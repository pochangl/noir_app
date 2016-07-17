import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProjectListPage} from '../project/list';
import {PayCheckListPage} from '../transaction/list';
import {DayOffListPage} from '../schedule/list';


@Component({
	templateUrl: 'build/pages/general/home.html'
})

export class HomePage {
	constructor(private nav: NavController){
	}
	
	project(){
		this.nav.push(ProjectListPage);
	}
	debt(){
		this.nav.push(PayCheckListPage);
	}
	dayoff(){
		this.nav.push(DayOffListPage);
	}
}
