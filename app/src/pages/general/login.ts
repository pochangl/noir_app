import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { HomePage } from './home';
import { Auth } from './models';

// @Component({selector: 'page-login', templateUrl: 'login.html',providers: [Api]})
@Component({templateUrl: 'login.html',providers: [Api]})
export class LoginPage {
  user_info: Auth;

  constructor(
    protected nav: NavController,
    protected api: Api
  ) {
    this.user_info = new Auth(this.api);
  }

  public login() {
    // this.showLoading()
    // this.auth.login(this.registerCredentials).subscribe(allowed => {
    //   if (allowed) {
    //     // setTimeout(() => {
    //     // this.loading.dismiss();
    //     // this.nav.setRoot(HomePage)
    //     // });
    //     this.nav.setRoot(HomePage)
    //   } else {
    //     // this.showError("Access Denied");
    //     alert('Access Denied');
    //   }
    // },
    // error => {
    //   // this.showError(error);
    //   alert('error');
    // });
    this.user_info.login_user().then(() => {
      this.nav.setRoot(HomePage);
    })
  }

  // showLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   this.loading.present();
  // }
  //
  // showError(text) {
  //   setTimeout(() => {
  //     this.loading.dismiss();
  //   });
  //
  //   let alert = this.alertCtrl.create({
  //     title: 'Fail',
  //     subTitle: text,
  //     buttons: ['OK']
  //   });
  //   alert.present(prompt);
  // }
}
