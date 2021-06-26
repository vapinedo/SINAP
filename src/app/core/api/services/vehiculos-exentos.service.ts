/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ExentosToTable } from '../models/exentos-to-table';
import { ExentosFilter } from '../models/exentos-filter';
import { ExentosDetail } from '../models/exentos-detail';

/**
 * Exentos Controller
 */
@Injectable({
  providedIn: 'root',
})
class VehiculosExentosService extends __BaseService {
  static readonly getExentosRtnPlacaUsingPOSTPath = '/vehiculosExentos';
  static readonly getDetailExentoUsingGETPath = '/vehiculosExentos/findDetailById';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar vehiculos exentos por RTN y/o placa
   * @param exentosFilter exentosFilter
   * @return OK
   */
  getExentosRtnPlacaUsingPOSTResponse(exentosFilter: ExentosFilter): __Observable<__StrictHttpResponse<ExentosToTable>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = exentosFilter;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vehiculosExentos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ExentosToTable>;
      })
    );
  }
  /**
   * Consultar vehiculos exentos por RTN y/o placa
   * @param exentosFilter exentosFilter
   * @return OK
   */
  getExentosRtnPlacaUsingPOST(exentosFilter: ExentosFilter): __Observable<ExentosToTable> {
    return this.getExentosRtnPlacaUsingPOSTResponse(exentosFilter).pipe(
      __map(_r => _r.body as ExentosToTable)
    );
  }

  /**
   * Obtener el detalle de un vehiculo exento por id vehiculo
   * @param id id
   * @return OK
   */
  getDetailExentoUsingGETResponse(id: number): __Observable<__StrictHttpResponse<ExentosDetail>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vehiculosExentos/findDetailById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ExentosDetail>;
      })
    );
  }
  /**
   * Obtener el detalle de un vehiculo exento por id vehiculo
   * @param id id
   * @return OK
   */
  getDetailExentoUsingGET(id: number): __Observable<ExentosDetail> {
    return this.getDetailExentoUsingGETResponse(id).pipe(
      __map(_r => _r.body as ExentosDetail)
    );
  }
}

module VehiculosExentosService {
}

export { VehiculosExentosService }
