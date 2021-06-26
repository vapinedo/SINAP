/* tslint:disable */
import { ParametroCreateTarifa } from './parametro-create-tarifa';
export interface CondicionesTarifaParaMulta {
  estado?: string;
  idCondTarifa?: number;
  ordenAplicacion?: number;
  parametrosList?: Array<ParametroCreateTarifa>;
}
