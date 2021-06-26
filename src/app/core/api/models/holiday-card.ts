/* tslint:disable */
import { DepartmentCard } from './department-card';
export interface HolidayCard {
  children?: Array<DepartmentCard>;
  codBanco?: number;
  idDepartamento?: number;
  idEntidad?: number;
  idMunicipio?: number;
  nombre?: string;
  numeroEventos?: number;
}
