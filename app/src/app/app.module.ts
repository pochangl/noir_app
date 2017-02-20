import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/general/home';

import { ProjectChooseServicePage } from '../pages/project/project_choose_service';
import { AddAssignmentPage } from '../pages/project/add_assignment';
import { ProjectDetailPage, ProjectDetailManagementPage } from '../pages/project/detail';
import { ProjectListPage } from '../pages/project/list';
import { PickDatePage as ProjectPickDatePage } from '../pages/project/pick_date';

import { DayOffEmployeesPage } from '../pages/schedule/dayoff_employees';
import { DayOffDaysPage } from '../pages/schedule/dayoff_days';

import { InsuranceChooseServicePage } from '../pages/transaction/insurance_choose_service';
import { PickDatePage as InsurancePickDatePage } from '../pages/transaction/insurance_pick_date';
import { WageAddRecordPage } from '../pages/transaction/paycheck_add_record';
import { PaycheckChooseServicePage } from '../pages/transaction/paycheck_choose_service';
import { PaycheckDetailPage } from '../pages/transaction/paycheck_detail';
import { WageDateRangePage } from '../pages/transaction/wage_date_range';
import { WageEmployeesPage } from '../pages/transaction/wage_employees';
import { WorkHourDateRangePage } from '../pages/transaction/work_hour_date_range';
import { WorkHourEmployeesPage } from '../pages/transaction/work_hour_employees';
import { WorkHourRecordsPage } from '../pages/transaction/work_hour_records';

@NgModule({
  declarations: [
    MyApp,
    HomePage,

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
    WageAddRecordPage,
    PaycheckChooseServicePage,
    PaycheckDetailPage,
    WageDateRangePage,
    WageEmployeesPage,
    WorkHourDateRangePage,
    WorkHourEmployeesPage,
    WorkHourRecordsPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,


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
    WageAddRecordPage,
    PaycheckChooseServicePage,
    PaycheckDetailPage,
    WageDateRangePage,
    WageEmployeesPage,
    WorkHourDateRangePage,
    WorkHourEmployeesPage,
    WorkHourRecordsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
