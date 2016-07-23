import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {SignInPage} from './pages/general/sign_in';
import {HomePage} from './pages/general/home';
import {ProjectListPage} from './pages/project/list';
import {PayCheckListPage} from './pages/transaction/list';
import {DayOffListPage} from './pages/schedule/list';


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
      { title: '主選單', component: HomePage },
      { title: '選擇工地', component: ProjectListPage},
      { title: '請假', component: DayOffListPage},
      { title: '支款', component: PayCheckListPage}
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
