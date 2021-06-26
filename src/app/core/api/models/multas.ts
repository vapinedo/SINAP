/* tslint:disable */
import { CondicionesTarifaParaMulta } from './condiciones-tarifa-para-multa';
import { DetalleMulta } from './detalle-multa';
import { Concepto } from './concepto';
export interface Multas {
  condicionTarifaList?: Array<CondicionesTarifaParaMulta>;
  descripcion?: string;
  detalleMultaList?: Array<DetalleMulta>;
  estado?: string;
  fechaActualiza?: string;
  fechaCreacion?: string;
  idParConcepto?: Concepto;
  multa?: number;
  nombre?: string;
  observaciones?: string;
  usuarioActualiza?: string;
  usuarioCreacion?: string;
}
