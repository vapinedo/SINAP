/* tslint:disable */
import { TarifasMunicipiosAsignar } from './tarifas-municipios-asignar';
import { ParametroCreateTarifa } from './parametro-create-tarifa';
export interface TarifasCreate {
  calcularImpuestoComo?: string;
  concepto: number;
  descripcion?: string;
  estado?: string;
  fechaCreacion?: string;
  fechaFinal: string;
  fechaInicial: string;
  montoMinimo?: number;
  municipiosList?: Array<TarifasMunicipiosAsignar>;
  nombre: string;
  operValVehiculo?: string;
  parametrosList?: Array<ParametroCreateTarifa>;
  referenciaPorcentaje?: string;
  usuarioCreacion?: string;
  valMaxVehiculo?: number;
  valMinVehiculo?: number;
  valorFijo?: number;
  valorPorcentaje?: number;
}
