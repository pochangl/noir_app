import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProjectListPage} from '../project/list';
import {DayOffEmployeesPage} from '../schedule/dayoff_employees';
import {PayCheckChooseEmployeePage} from '../transaction/paycheck_choose_employee';
import {DebtChooseEmployeePage} from '../transaction/debt_choose_employee';


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
		this.nav.push(DayOffEmployeesPage);
	}
	paycheck(){
		this.nav.push(PayCheckChooseEmployeePage);
	}
	debt(){
		this.nav.push(DebtChooseEmployeePage);
	}
}
