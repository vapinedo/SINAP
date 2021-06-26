/* tslint:disable */
export interface PrescriptionCreate {
  concepto: number;
  descripcion?: string;
  estado: string;
  fechaAplicacion: string;
  finVigencia?: string;
  id?: number;
  idTiempo: string;
  inicioVigencia: string;
  nombre: string;
  periodosVigentes: number;
  tipoConcepto: string;
}
