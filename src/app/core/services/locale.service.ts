import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { timezone } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor() {
    this.setDefaultTimezone();
  }

  setDefaultTimezone() {
    moment.tz.setDefault(timezone.timezone);
  }
  
}
