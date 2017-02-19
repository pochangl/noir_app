import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({templateUrl: 'sign_in.html'})
export class SignInPage {
  username: string;
  password: string;

  constructor(private nav: NavController) {
  }
  sign_in() {
    // this.nav.push(HomePage);
  }
  ionViewWillEnter () {
    this.sign_in();
  }
}
