/* tslint:disable */
import { EstadoCuentaCToTable } from './estado-cuenta-cto-table';
import { EstadoCuentaCHeader } from './estado-cuenta-cheader';
import { EstadoCuentaCFooter } from './estado-cuenta-cfooter';
export interface EstadoCuentaCorriente {
  dataTable?: Array<EstadoCuentaCToTable>;
  encabezado?: EstadoCuentaCHeader;
  footer?: EstadoCuentaCFooter;
}
