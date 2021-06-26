/* tslint:disable */
import { DetalleTransaccionesToTable } from './detalle-transacciones-to-table';
export interface DetalleTransacciones {
  detalle?: Array<DetalleTransaccionesToTable>;
  iduVehiculo?: number;
  periodo?: number;
  total?: number;
  totalExcedente?: number;
  totalImpuesto?: number;
  totalMulta?: number;
  totalPeriodo?: number;
}
