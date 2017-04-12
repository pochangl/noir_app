import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/general/home';
import { LoginPage } from '../pages/general/login';
import { RegisterPage } from '../pages/general/register';

import { AuthService } from '../providers/auth-service';

import { AccInfoChooseServicePage } from '../pages/account/acc_info_choose_service';
import { AccInfoEmplyeesPage } from '../pages/account/acc_info_employees';
import { AccInfoEmplyeeDetailPage } from '../pages/account/acc_info_employee_detail';
import { NewEmployeePage } from '../pages/account/new_employee';
import { AccInfoCompaniesPage } from '../pages/account/acc_info_companies';
import { AccInfoCompanyDetailPage } from '../pages/account/acc_info_company_detail';
import { NewCompanyPage } from '../pages/account/new_company';

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
import { InsuranceDateRangePage } from '../pages/insurance/records_date_range';
import { InsuranceRecordsPage } from '../pages/insurance/insurance_records';

import { PaycheckChooseServicePage } from '../pages/transaction/paycheck_choose_service';
import { WageDateRangePage } from '../pages/transaction/wage_date_range';
import { WageEmployeesPage } from '../pages/transaction/wage_employees';
import { WorkHourDateRangePage } from '../pages/transaction/work_hour_date_range';
import { WorkHourEmployeesPage } from '../pages/transaction/work_hour_employees';
import { SettlingAccountsPage } from '../pages/transaction/settling_accounts_page';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,

    AccInfoChooseServicePage,
    AccInfoEmplyeesPage,
    AccInfoEmplyeeDetailPage,
    NewEmployeePage,
    AccInfoCompaniesPage,
    AccInfoCompanyDetailPage,
    NewCompanyPage,

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
    InsuranceDateRangePage,
    InsuranceRecordsPage,

    PaycheckChooseServicePage,
    WageDateRangePage,
    WageEmployeesPage,
    WorkHourDateRangePage,
    WorkHourEmployeesPage,
    SettlingAccountsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,

    AccInfoChooseServicePage,
    AccInfoEmplyeesPage,
    AccInfoEmplyeeDetailPage,
    NewEmployeePage,
    AccInfoCompaniesPage,
    AccInfoCompanyDetailPage,
    NewCompanyPage,

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
    InsuranceDateRangePage,
    InsuranceRecordsPage,

    PaycheckChooseServicePage,
    WageDateRangePage,
    WageEmployeesPage,
    WorkHourDateRangePage,
    WorkHourEmployeesPage,
    SettlingAccountsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
