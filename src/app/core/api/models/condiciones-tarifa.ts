/* tslint:disable */
import { ParametroCreateTarifa } from './parametro-create-tarifa';
export interface CondicionesTarifa {
  idCondTarifa?: number;
  ordenAplicacion?: number;
  parametrosList?: Array<ParametroCreateTarifa>;
}
