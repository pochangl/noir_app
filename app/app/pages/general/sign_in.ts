import {Component} from '@angular/core';
import {Loading, NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../general/home';


@Component({
	templateUrl: 'build/pages/general/sign_in.html'
})

export class SignInPage {
	constructor(private nav: NavController){
	}
	
	presentLoading() {
		let loading = Loading.create({
			content: "Please wait...",
			duration: 3000,
			dismissOnPageChange: true
		});
		this.nav.present(loading);
	}

	sign_in(){
		this.presentLoading();
		this.nav.push(HomePage);
	}
}
