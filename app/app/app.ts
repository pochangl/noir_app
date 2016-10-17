import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {SignInPage} from './pages/general/sign_in';
import {HomePageV2} from './pages/general/home_v2';
import {HomePage} from './pages/general/home';
import {ProjectListPage} from './pages/project/list';
import {DayOffListPage} from './pages/schedule/list';
import {PayCheckChooseEmployeePage} from './pages/transaction/paycheck_choose_employee';
import {DebtChooseEmployeePage} from './pages/transaction/debt_choose_employee';


@Component({
  templateUrl: 'build/app.html'
})

class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '使用者登錄', component: SignInPage },
      { title: '主選單_v2', component: HomePageV2 },
      { title: '主選單', component: HomePage },
      { title: '選擇工地', component: ProjectListPage},
      { title: '請假', component: DayOffListPage},
      { title: '薪資', component: PayCheckChooseEmployeePage},
      { title: '借款', component: DebtChooseEmployeePage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
