import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PickDatePage} from '../project/pick_date';
import {DayOffEmployeesPage} from '../schedule/dayoff_employees';
import {PaycheckEmployeesPage} from '../transaction/paycheck_employees';
import {DebtEmployeesPage} from '../transaction/debt_employees';


@Component({
	templateUrl: 'build/pages/general/home.html'
})

export class HomePage {
	constructor(private nav: NavController){
	}

	project(){
		this.nav.push(PickDatePage);
	}
	dayoff(){
		this.nav.push(DayOffEmployeesPage);
	}
	paycheck(){
		this.nav.push(PaycheckEmployeesPage);
	}
	debt(){
		this.nav.push(DebtEmployeesPage);
	}
}
