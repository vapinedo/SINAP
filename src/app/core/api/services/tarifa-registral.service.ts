/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TarifaRegistralCreate } from '../models/tarifa-registral-create';
import { TarifaRegistral } from '../models/tarifa-registral';
import { TarifaRegistralToTable } from '../models/tarifa-registral-to-table';

/**
 * Tarifa Registral Controller
 */
@Injectable({
  providedIn: 'root',
})
class TarifaRegistralService extends __BaseService {
  static readonly createTarifaRegistralUsingPOSTPath = '/tarifaRegistral';
  static readonly updateTarifaRegistralUsingPUTPath = '/tarifaRegistral';
  static readonly deleteTarifaRegistralUsingDELETEPath = '/tarifaRegistral';
  static readonly findAllTarifaRegistralUsingGETPath = '/tarifaRegistral/findAll';
  static readonly findByIdTarifaRegistralUsingGETPath = '/tarifaRegistral/findById';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Crear una tarifa para debitos registrales
   * @param tarifaRegistral tarifaRegistral
   */
  createTarifaRegistralUsingPOSTResponse(tarifaRegistral: TarifaRegistralCreate): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tarifaRegistral;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tarifaRegistral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Crear una tarifa para debitos registrales
   * @param tarifaRegistral tarifaRegistral
   */
  createTarifaRegistralUsingPOST(tarifaRegistral: TarifaRegistralCreate): __Observable<null> {
    return this.createTarifaRegistralUsingPOSTResponse(tarifaRegistral).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Actualizar la informacion de una tarifa para debitros registrales
   * @param tarifaRegistral tarifaRegistral
   */
  updateTarifaRegistralUsingPUTResponse(tarifaRegistral: TarifaRegistral): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tarifaRegistral;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tarifaRegistral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Actualizar la informacion de una tarifa para debitros registrales
   * @param tarifaRegistral tarifaRegistral
   */
  updateTarifaRegistralUsingPUT(tarifaRegistral: TarifaRegistral): __Observable<null> {
    return this.updateTarifaRegistralUsingPUTResponse(tarifaRegistral).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Eliminar logicamente una tarifa de debito registral
   * @param idTarifa idTarifa
   */
  deleteTarifaRegistralUsingDELETEResponse(idTarifa: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTarifa != null) __params = __params.set('idTarifa', idTarifa.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tarifaRegistral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Eliminar logicamente una tarifa de debito registral
   * @param idTarifa idTarifa
   */
  deleteTarifaRegistralUsingDELETE(idTarifa: number): __Observable<null> {
    return this.deleteTarifaRegistralUsingDELETEResponse(idTarifa).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Obtener todos los debitos registrales registrados en estado Activo e Inactivo
   * @return OK
   */
  findAllTarifaRegistralUsingGETResponse(): __Observable<__StrictHttpResponse<Array<TarifaRegistralToTable>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tarifaRegistral/findAll`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TarifaRegistralToTable>>;
      })
    );
  }
  /**
   * Obtener todos los debitos registrales registrados en estado Activo e Inactivo
   * @return OK
   */
  findAllTarifaRegistralUsingGET(): __Observable<Array<TarifaRegistralToTable>> {
    return this.findAllTarifaRegistralUsingGETResponse().pipe(
      __map(_r => _r.body as Array<TarifaRegistralToTable>)
    );
  }

  /**
   * Obtener una tarifa de debito registral por ID
   * @param idTarifa idTarifa
   * @return OK
   */
  findByIdTarifaRegistralUsingGETResponse(idTarifa: number): __Observable<__StrictHttpResponse<TarifaRegistral>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTarifa != null) __params = __params.set('idTarifa', idTarifa.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tarifaRegistral/findById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TarifaRegistral>;
      })
    );
  }
  /**
   * Obtener una tarifa de debito registral por ID
   * @param idTarifa idTarifa
   * @return OK
   */
  findByIdTarifaRegistralUsingGET(idTarifa: number): __Observable<TarifaRegistral> {
    return this.findByIdTarifaRegistralUsingGETResponse(idTarifa).pipe(
      __map(_r => _r.body as TarifaRegistral)
    );
  }
}

module TarifaRegistralService {
}

export { TarifaRegistralService }
