/* tslint:disable */
import { CuotasMultasDTO } from './cuotas-multas-dto';
import { TarifasMunicipiosAsignar } from './tarifas-municipios-asignar';
import { ParametroCreateMulta } from './parametro-create-multa';
export interface MultasUpdate {
  concepto: number;
  descripcion?: string;
  estado?: string;
  fechaFinal: string;
  fechaInicial: string;
  id: number;
  lstCuotas: Array<CuotasMultasDTO>;
  modificado?: boolean;
  modoCobro: string;
  montoMinimo?: number;
  municipiosList?: Array<TarifasMunicipiosAsignar>;
  nombre: string;
  numeroCuotas: number;
  observaciones?: string;
  operValVehiculo?: string;
  parametrosList?: Array<ParametroCreateMulta>;
  periodicidad?: string;
  referenciaPorcentaje?: string;
  tarifa?: number;
  tipoConcepto?: string;
  valMaxVehiculo?: number;
  valMinVehiculo?: number;
  valorMaximo: number;
  valorMinimo: number;
  valorPorcentaje?: number;
}
