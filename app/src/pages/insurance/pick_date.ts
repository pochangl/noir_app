import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PickDatePage as ProjectPickDatePage } from '../project/pick_date'
import { InsuranceListPage } from './list';
import { Api } from '../../providers/api/api';

@Component({templateUrl: 'pick_date.html',providers: [Api]})
export class PickDatePage extends ProjectPickDatePage {
  title = '保險';

  constructor(
    protected nav: NavController,
    protected api: Api
  ) {
    super(nav, api)
  }
  click (date) {
    this.nav.push(InsuranceListPage, {'date': date});
  }
}
