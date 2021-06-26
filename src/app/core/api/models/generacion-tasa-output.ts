/* tslint:disable */
import { GeneracionTasaInput } from './generacion-tasa-input';
import { RespuestaGenerica } from './respuesta-generica';
import { TasaGenerada } from './tasa-generada';
export interface GeneracionTasaOutput {
  input?: GeneracionTasaInput;
  status?: RespuestaGenerica;
  tasa?: TasaGenerada;
}
