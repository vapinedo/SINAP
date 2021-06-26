/* tslint:disable */
import { AsignaVarConcepto } from './asigna-var-concepto';
import { CondicionesTarifa } from './condiciones-tarifa';
import { Concepto } from './concepto';
import { TarifasMunicipios } from './tarifas-municipios';
export interface Tarifas {
  asignaVarConceptoList?: Array<AsignaVarConcepto>;
  calcularImpuestoComo?: string;
  descCalcularImpuestoComo?: string;
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
  usuarioActualiza?: string;
  usuarioCreacion?: string;
  valMaxVehiculo?: number;
  valMinVehiculo?: number;
  valorFijo?: number;
  valorPorcentaje?: number;
}
