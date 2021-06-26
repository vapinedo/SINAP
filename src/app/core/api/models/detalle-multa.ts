/* tslint:disable */
import { CuotaMulta } from './cuota-multa';
import { MultaMunicipio } from './multa-municipio';
import { TarifasMultasCorta } from './tarifas-multas-corta';
export interface DetalleMulta {
  calculoProporcional?: string;
  codigoOperacion?: string;
  cuotaMultaList?: Array<CuotaMulta>;
  descModoCobro?: string;
  descOperValVehiculo?: string;
  descPeriodicidad?: string;
  descRefenciaPorcentaje?: string;
  estado?: string;
  fechaFinVigencia?: string;
  fechaInicioVigencia?: string;
  idDetalleMulta?: number;
  modoCobro?: string;
  montoMinimo?: number;
  multaMunicipioList?: Array<MultaMunicipio>;
  numeroCuotas?: number;
  operValVehiculo?: string;
  periodicidad?: string;
  referenciaPorcentaje?: string;
  tarifa?: TarifasMultasCorta;
  tipoConcepto?: string;
  totalMes?: number;
  valMaxVehiculo?: number;
  valMinVehiculo?: number;
  valorMaximo?: number;
  valorMinimo?: number;
  valorMinimoPorCuota?: number;
  valorPorcentaje?: number;
}
