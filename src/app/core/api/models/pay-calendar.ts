/* tslint:disable */
import { PlateClassCalendarPay } from './plate-class-calendar-pay';
export interface PayCalendar {
  conceptosCobro: number;
  estado: string;
  fechaCreacion?: string;
  fechaFin: string;
  fechaInicio: string;
  id: number;
  mes: string;
  nombre: string;
  observaciones: string;
  placas: Array<number>;
  tipoPlaca: Array<PlateClassCalendarPay>;
  usuarioCreacion?: string;
}
