import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProjectListPage} from '../project/list';
import {DayOffListPage} from '../schedule/list';
import {PayCheckListPage} from '../transaction/paychecklist';
import {DebtListPage} from '../transaction/debtlist';


@Component({
	templateUrl: 'build/pages/general/home.html'
})

export class HomePage {
	constructor(private nav: NavController){
	}
	
	project(){
		this.nav.push(ProjectListPage);
	}
	dayoff(){
		this.nav.push(DayOffListPage);
	}
	paycheck(){
		this.nav.push(PayCheckListPage);
	}
	debt(){
		this.nav.push(DebtListPage);
	}
}
