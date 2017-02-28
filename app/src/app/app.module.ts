import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/general/home';

import { AccInfoChooseServicePage } from '../pages/account/acc_info_choose_service';
import { AccInfoEmplyeesPage } from '../pages/account/acc_info_employees';
import { AccInfoEmplyeeDetailPage } from '../pages/account/acc_info_employee_detail';

import { ProjectChooseServicePage } from '../pages/project/project_choose_service';
import { AddAssignmentPage } from '../pages/project/add_assignment';
import { ProjectDetailPage, ProjectDetailManagementPage } from '../pages/project/detail';
import { ProjectListPage } from '../pages/project/list';
import { PickDatePage as ProjectPickDatePage } from '../pages/project/pick_date';

import { DayOffEmployeesPage } from '../pages/schedule/dayoff_employees';
import { DayOffDaysPage } from '../pages/schedule/dayoff_days';

import { InsuranceChooseServicePage } from '../pages/insurance/choose_service';
import { PickDatePage as InsurancePickDatePage } from '../pages/insurance/pick_date';
import { InsuranceListPage } from '../pages/insurance/list';

import { PaycheckChooseServicePage } from '../pages/transaction/paycheck_choose_service';
import { WageDateRangePage } from '../pages/transaction/wage_date_range';
import { WageEmployeesPage } from '../pages/transaction/wage_employees';
import { WorkHourDateRangePage } from '../pages/transaction/work_hour_date_range';
import { WorkHourEmployeesPage } from '../pages/transaction/work_hour_employees';

@NgModule({
  declarations: [
    MyApp,
    HomePage,

    AccInfoChooseServicePage,
    AccInfoEmplyeesPage,
    AccInfoEmplyeeDetailPage,

    ProjectChooseServicePage,
    AddAssignmentPage,
    ProjectDetailPage,
    ProjectDetailManagementPage,
    ProjectListPage,
    ProjectPickDatePage,
    ProjectChooseServicePage,

    DayOffEmployeesPage,
    DayOffDaysPage,

    InsuranceChooseServicePage,
    InsurancePickDatePage,
    InsuranceListPage,

    PaycheckChooseServicePage,
    WageDateRangePage,
    WageEmployeesPage,
    WorkHourDateRangePage,
    WorkHourEmployeesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

    AccInfoChooseServicePage,
    AccInfoEmplyeesPage,
    AccInfoEmplyeeDetailPage,

    ProjectChooseServicePage,
    AddAssignmentPage,
    ProjectDetailPage,
    ProjectDetailManagementPage,
    ProjectListPage,
    ProjectPickDatePage,
    ProjectChooseServicePage,

    DayOffEmployeesPage,
    DayOffDaysPage,

    InsuranceChooseServicePage,
    InsurancePickDatePage,
    InsuranceListPage,

    PaycheckChooseServicePage,
    WageDateRangePage,
    WageEmployeesPage,
    WorkHourDateRangePage,
    WorkHourEmployeesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
