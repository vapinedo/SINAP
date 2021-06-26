/* tslint:disable */
import { CuotaMultaCreate } from './cuota-multa-create';
import { MultasMunicipioAsignar } from './multas-municipio-asignar';
import { ParametroCreateMulta } from './parametro-create-multa';
export interface MultasCreate {
  concepto: number;
  cuotasList?: Array<CuotaMultaCreate>;
  descripcion?: string;
  estado?: string;
  fechaFinal?: string;
  fechaInicial: string;
  modoCobro?: string;
  montoMinimo?: number;
  municipiosList?: Array<MultasMunicipioAsignar>;
  nombre: string;
  numeroCuotas: number;
  operValVehiculo?: string;
  parametrosList?: Array<ParametroCreateMulta>;
  periodicidad?: string;
  referenciaPorcentaje?: string;
  tarifa?: number;
  valMaxVehiculo?: number;
  valMinVehiculo?: number;
  valorMaximoMulta?: number;
  valorMinimoCuota?: number;
  valorPorcentaje?: number;
}
