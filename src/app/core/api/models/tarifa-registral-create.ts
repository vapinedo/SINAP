/* tslint:disable */
export interface TarifaRegistralCreate {
  conceptoDebRegistral: number;
  decimal: string;
  descripcion?: string;
  estado: string;
  fechaFinVigencia: string;
  fechaInicioVigencia: string;
  nombre: string;
  tipoPlaca: string;
  tipoVehiculo: number;
}
