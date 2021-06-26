/* tslint:disable */
import { Normativa } from './normativa';
export interface Concepto {
  cobraMulta?: string;
  codigo?: string;
  descripcion?: string;
  estado?: string;
  fechaActualiza?: string;
  fechaCreacion?: string;
  fechaFinVigencia?: string;
  fechaInicioVigencia?: string;
  id?: number;
  nombre?: string;
  normativa?: Normativa;
  observaciones?: string;
  registral?: string;
  tipologia?: string;
  usuarioActualiza?: string;
  usuarioCreacion?: string;
}
