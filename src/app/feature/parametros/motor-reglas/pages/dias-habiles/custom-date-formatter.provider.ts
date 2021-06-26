import { CalendarDateFormatter, DateFormatterParams } from "angular-calendar";
import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {    
    let dias: string = formatDate(date, "EEE", locale);
    return dias.substring(0,1).toUpperCase();
  }

  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, "MMMM", locale);
  }
}
