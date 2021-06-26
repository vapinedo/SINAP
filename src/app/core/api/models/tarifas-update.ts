/* tslint:disable */
import { TarifasMunicipiosAsignar } from './tarifas-municipios-asignar';
import { ParametroCreateTarifa } from './parametro-create-tarifa';
export interface TarifasUpdate {
  calcularImpuestoComo?: string;
  concepto: number;
  descripcion?: string;
  estado?: string;
  fechaFinal: string;
  fechaInicial: string;
  id: number;
  montoMinimo?: number;
  municipiosList?: Array<TarifasMunicipiosAsignar>;
  nombre: string;
  observaciones?: string;
  operValVehiculo?: string;
  parametrosList?: Array<ParametroCreateTarifa>;
  referenciaPorcentaje?: string;
  valMaxVehiculo?: number;
  valMinVehiculo?: number;
  valorFijo?: number;
  valorPorcentaje?: number;
}
