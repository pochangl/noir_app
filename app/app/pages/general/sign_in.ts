import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../general/home';


@Component({
	templateUrl: 'build/pages/general/sign_in.html'
})

export class SignInPage {
	constructor(private nav: NavController){
	}
	
	sign_in(){
		this.nav.push(HomePage);
	}
}
