/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DetalleTransacciones } from '../models/detalle-transacciones';

/**
 * Transacciones Controller
 */
@Injectable({
  providedIn: 'root',
})
class TransaccionesService extends __BaseService {
  static readonly getPrescriptionsByidUsingGET1Path = '/transacciones/get-by-vehiculo-periodo/{iduVehiculo}/{periodo}/{tipoTasa}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener prescripcion por id
   * @param params The `TransaccionesService.GetPrescriptionsByidUsingGET1Params` containing the following parameters:
   *
   * - `tipoTasa`: tipoTasa
   *
   * - `periodo`: periodo
   *
   * - `iduVehiculo`: iduVehiculo
   *
   * @return OK
   */
  getPrescriptionsByidUsingGET1Response(params: TransaccionesService.GetPrescriptionsByidUsingGET1Params): __Observable<__StrictHttpResponse<DetalleTransacciones>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/transacciones/get-by-vehiculo-periodo/${encodeURIComponent(String(params.iduVehiculo))}/${encodeURIComponent(String(params.periodo))}/${encodeURIComponent(String(params.tipoTasa))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DetalleTransacciones>;
      })
    );
  }
  /**
   * Obtener prescripcion por id
   * @param params The `TransaccionesService.GetPrescriptionsByidUsingGET1Params` containing the following parameters:
   *
   * - `tipoTasa`: tipoTasa
   *
   * - `periodo`: periodo
   *
   * - `iduVehiculo`: iduVehiculo
   *
   * @return OK
   */
  getPrescriptionsByidUsingGET1(params: TransaccionesService.GetPrescriptionsByidUsingGET1Params): __Observable<DetalleTransacciones> {
    return this.getPrescriptionsByidUsingGET1Response(params).pipe(
      __map(_r => _r.body as DetalleTransacciones)
    );
  }
}

module TransaccionesService {

  /**
   * Parameters for getPrescriptionsByidUsingGET1
   */
  export interface GetPrescriptionsByidUsingGET1Params {

    /**
     * tipoTasa
     */
    tipoTasa: string;

    /**
     * periodo
     */
    periodo: string;

    /**
     * iduVehiculo
     */
    iduVehiculo: number;
  }
}

export { TransaccionesService }
