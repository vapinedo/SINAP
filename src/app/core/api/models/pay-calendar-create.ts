/* tslint:disable */
import { PlateClassCalendarPay } from './plate-class-calendar-pay';
import { PlateCalendarPay } from './plate-calendar-pay';
export interface PayCalendarCreate {
  clasePlacas: Array<PlateClassCalendarPay>;
  conceptoCobro: number;
  estado: string;
  fechaFin: string;
  fechaInicio?: string;
  id?: number;
  mes: string;
  nombre: string;
  placasCalendario: Array<PlateCalendarPay>;
}
