import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Injectable()
@NgModule({
    providers: [ { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } ],
})
export class DateFormatterCalendar extends CalendarDateFormatter {
  
}