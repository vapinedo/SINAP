/* tslint:disable */
import { CondicionesTarifa } from './condiciones-tarifa';
import { Concepto } from './concepto';
import { TarifasMunicipios } from './tarifas-municipios';
export interface TarifaNormalRegistral {
  calcularImpuestoComo?: string;
  clasePlaca?: string;
  conceptoDebito?: string;
  desCalcularImpuestoComo?: string;
  descOperValVehiculo?: string;
  descRefenciaPorcentaje?: string;
  descripcion?: string;
  estado?: string;
  fechaActualiza?: string;
  fechaCreacion?: string;
  fechaFinal?: string;
  fechaInicial?: string;
  id?: number;
  idCondTarifa?: CondicionesTarifa;
  idParConcepto?: Concepto;
  montoMinimo?: number;
  municipiosList?: Array<TarifasMunicipios>;
  nombre?: string;
  observaciones?: string;
  operValVehiculo?: string;
  refenciaPorcentaje?: string;
  registral?: boolean;
  tipoVehiculo?: string;
  usuarioActualiza?: string;
  usuarioCreacion?: string;
  valMaxVehiculo?: number;
  valMinVehiculo?: number;
  valorFijo?: number;
  valorPorcentaje?: number;
}
