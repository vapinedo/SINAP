/* tslint:disable */
import { MunicipalityCard } from './municipality-card';
export interface DepartmentCard {
  children?: Array<MunicipalityCard>;
  codBanco?: number;
  idDepartamento?: number;
  idEntidad?: number;
  idMunicipio?: number;
  nombre?: string;
  numeroEventos?: number;
}
