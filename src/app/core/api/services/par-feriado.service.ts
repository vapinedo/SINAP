/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { HolidayCreate } from '../models/holiday-create';
import { HolidayUpdate } from '../models/holiday-update';
import { HolidayToEvent } from '../models/holiday-to-event';
import { HolidayCard } from '../models/holiday-card';

/**
 * Par Feriado Controller
 */
@Injectable({
  providedIn: 'root',
})
class ParFeriadoService extends __BaseService {
  static readonly saveHolidayCreateUsingPOSTPath = '/parFeriado';
  static readonly updateHolidayCreateUsingPUTPath = '/parFeriado';
  static readonly getHolidayToEventsUsingDELETEPath = '/parFeriado';
  static readonly getHolidayToEventsUsingGETPath = '/parFeriado/eventos';
  static readonly getHolidayCardsUsingGETPath = '/parFeriado/tarjetas';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Crea el evento enviado
   * @param holidayCreate holidayCreate
   * @return OK
   */
  saveHolidayCreateUsingPOSTResponse(holidayCreate: HolidayCreate): __Observable<__StrictHttpResponse<HolidayCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = holidayCreate;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/parFeriado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<HolidayCreate>;
      })
    );
  }
  /**
   * Crea el evento enviado
   * @param holidayCreate holidayCreate
   * @return OK
   */
  saveHolidayCreateUsingPOST(holidayCreate: HolidayCreate): __Observable<HolidayCreate> {
    return this.saveHolidayCreateUsingPOSTResponse(holidayCreate).pipe(
      __map(_r => _r.body as HolidayCreate)
    );
  }

  /**
   * Actualizar el evento enviado
   * @param holidayUpdate holidayUpdate
   * @return OK
   */
  updateHolidayCreateUsingPUTResponse(holidayUpdate: HolidayUpdate): __Observable<__StrictHttpResponse<HolidayUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = holidayUpdate;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/parFeriado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<HolidayUpdate>;
      })
    );
  }
  /**
   * Actualizar el evento enviado
   * @param holidayUpdate holidayUpdate
   * @return OK
   */
  updateHolidayCreateUsingPUT(holidayUpdate: HolidayUpdate): __Observable<HolidayUpdate> {
    return this.updateHolidayCreateUsingPUTResponse(holidayUpdate).pipe(
      __map(_r => _r.body as HolidayUpdate)
    );
  }

  /**
   * Elimina el evento para el id enviado con la observacion enviada
   * @param params The `ParFeriadoService.GetHolidayToEventsUsingDELETEParams` containing the following parameters:
   *
   * - `observacion`: observacion
   *
   * - `id`: id
   */
  getHolidayToEventsUsingDELETEResponse(params: ParFeriadoService.GetHolidayToEventsUsingDELETEParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.observacion != null) __params = __params.set('observacion', params.observacion.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/parFeriado`,
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
   * Elimina el evento para el id enviado con la observacion enviada
   * @param params The `ParFeriadoService.GetHolidayToEventsUsingDELETEParams` containing the following parameters:
   *
   * - `observacion`: observacion
   *
   * - `id`: id
   */
  getHolidayToEventsUsingDELETE(params: ParFeriadoService.GetHolidayToEventsUsingDELETEParams): __Observable<null> {
    return this.getHolidayToEventsUsingDELETEResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Consulta la lista de eventos para los id enviados
   * @param params The `ParFeriadoService.GetHolidayToEventsUsingGETParams` containing the following parameters:
   *
   * - `nacional`: nacional
   *
   * - `idMunicipio`: idMunicipio
   *
   * - `idEntidad`: idEntidad
   *
   * - `idDepartamento`: idDepartamento
   *
   * - `codBanco`: codBanco
   *
   * @return OK
   */
  getHolidayToEventsUsingGETResponse(params: ParFeriadoService.GetHolidayToEventsUsingGETParams): __Observable<__StrictHttpResponse<Array<HolidayToEvent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.nacional != null) __params = __params.set('nacional', params.nacional.toString());
    if (params.idMunicipio != null) __params = __params.set('idMunicipio', params.idMunicipio.toString());
    if (params.idEntidad != null) __params = __params.set('idEntidad', params.idEntidad.toString());
    if (params.idDepartamento != null) __params = __params.set('idDepartamento', params.idDepartamento.toString());
    if (params.codBanco != null) __params = __params.set('codBanco', params.codBanco.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/parFeriado/eventos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<HolidayToEvent>>;
      })
    );
  }
  /**
   * Consulta la lista de eventos para los id enviados
   * @param params The `ParFeriadoService.GetHolidayToEventsUsingGETParams` containing the following parameters:
   *
   * - `nacional`: nacional
   *
   * - `idMunicipio`: idMunicipio
   *
   * - `idEntidad`: idEntidad
   *
   * - `idDepartamento`: idDepartamento
   *
   * - `codBanco`: codBanco
   *
   * @return OK
   */
  getHolidayToEventsUsingGET(params: ParFeriadoService.GetHolidayToEventsUsingGETParams): __Observable<Array<HolidayToEvent>> {
    return this.getHolidayToEventsUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<HolidayToEvent>)
    );
  }

  /**
   * Consulta la lista de tarjetas (departamentos, municipios, bancos, entidades) a mostrar
   * @return OK
   */
  getHolidayCardsUsingGETResponse(): __Observable<__StrictHttpResponse<Array<HolidayCard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/parFeriado/tarjetas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<HolidayCard>>;
      })
    );
  }
  /**
   * Consulta la lista de tarjetas (departamentos, municipios, bancos, entidades) a mostrar
   * @return OK
   */
  getHolidayCardsUsingGET(): __Observable<Array<HolidayCard>> {
    return this.getHolidayCardsUsingGETResponse().pipe(
      __map(_r => _r.body as Array<HolidayCard>)
    );
  }
}

module ParFeriadoService {

  /**
   * Parameters for getHolidayToEventsUsingDELETE
   */
  export interface GetHolidayToEventsUsingDELETEParams {

    /**
     * observacion
     */
    observacion: string;

    /**
     * id
     */
    id: number;
  }

  /**
   * Parameters for getHolidayToEventsUsingGET
   */
  export interface GetHolidayToEventsUsingGETParams {

    /**
     * nacional
     */
    nacional?: string;

    /**
     * idMunicipio
     */
    idMunicipio?: number;

    /**
     * idEntidad
     */
    idEntidad?: number;

    /**
     * idDepartamento
     */
    idDepartamento?: number;

    /**
     * codBanco
     */
    codBanco?: number;
  }
}

export { ParFeriadoService }
