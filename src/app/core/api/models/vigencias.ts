/* tslint:disable */
import { Concepto } from './concepto';
import { Normativa } from './normativa';
export interface Vigencias {
  concepto?: Concepto;
  descTipoPeriodo?: string;
  estado?: string;
  fechaActualiza?: string;
  fechaCreacion?: string;
  fechaFinal?: string;
  fechaInicial?: string;
  idVigencia?: number;
  normativa?: Normativa;
  observaciones?: string;
  periodo?: string;
  seRepite?: string;
  tipoPeriodo?: string;
  usuarioActualiza?: string;
  usuarioCreacion?: string;
}
