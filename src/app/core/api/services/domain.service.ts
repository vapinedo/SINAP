/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DetalleDominio } from '../models/detalle-dominio';
import { ItemMenu } from '../models/item-menu';
import { Domain } from '../models/domain';

/**
 * Domain Controller
 */
@Injectable({
  providedIn: 'root',
})
class DomainService extends __BaseService {
  static readonly getDomainsByIdAndIdDescriptionUsingGETPath = '/domain/get-by-id/{idDominio}/{idDetalle}';
  static readonly getDomainsByIdUsingGETPath = '/domain/get-by-id/{id}';
  static readonly getDomainsByIdAndNombreUsingGETPath = '/domain/get-by-nombre/{idDominio}/{nombre}';
  static readonly saveDomainUsingPOSTPath = '/domain/save';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener dominios por idDominio y idDetalle dominio en estado Activo
   * @param params The `DomainService.GetDomainsByIdAndIdDescriptionUsingGETParams` containing the following parameters:
   *
   * - `idDominio`: idDominio
   *
   * - `idDetalle`: idDetalle
   *
   * @return OK
   */
  getDomainsByIdAndIdDescriptionUsingGETResponse(params: DomainService.GetDomainsByIdAndIdDescriptionUsingGETParams): __Observable<__StrictHttpResponse<DetalleDominio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/domain/get-by-id/${encodeURIComponent(String(params.idDominio))}/${encodeURIComponent(String(params.idDetalle))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DetalleDominio>;
      })
    );
  }
  /**
   * Obtener dominios por idDominio y idDetalle dominio en estado Activo
   * @param params The `DomainService.GetDomainsByIdAndIdDescriptionUsingGETParams` containing the following parameters:
   *
   * - `idDominio`: idDominio
   *
   * - `idDetalle`: idDetalle
   *
   * @return OK
   */
  getDomainsByIdAndIdDescriptionUsingGET(params: DomainService.GetDomainsByIdAndIdDescriptionUsingGETParams): __Observable<DetalleDominio> {
    return this.getDomainsByIdAndIdDescriptionUsingGETResponse(params).pipe(
      __map(_r => _r.body as DetalleDominio)
    );
  }

  /**
   * Obtener dominios por id en estado Activo
   * @param id id
   * @return OK
   */
  getDomainsByIdUsingGETResponse(id: string): __Observable<__StrictHttpResponse<Array<ItemMenu>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/domain/get-by-id/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ItemMenu>>;
      })
    );
  }
  /**
   * Obtener dominios por id en estado Activo
   * @param id id
   * @return OK
   */
  getDomainsByIdUsingGET(id: string): __Observable<Array<ItemMenu>> {
    return this.getDomainsByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as Array<ItemMenu>)
    );
  }

  /**
   * Obtener dominios por idDominio y nombre dominio en estado Activo
   * @param params The `DomainService.GetDomainsByIdAndNombreUsingGETParams` containing the following parameters:
   *
   * - `nombre`: nombre
   *
   * - `idDominio`: idDominio
   *
   * @return OK
   */
  getDomainsByIdAndNombreUsingGETResponse(params: DomainService.GetDomainsByIdAndNombreUsingGETParams): __Observable<__StrictHttpResponse<DetalleDominio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/domain/get-by-nombre/${encodeURIComponent(String(params.idDominio))}/${encodeURIComponent(String(params.nombre))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DetalleDominio>;
      })
    );
  }
  /**
   * Obtener dominios por idDominio y nombre dominio en estado Activo
   * @param params The `DomainService.GetDomainsByIdAndNombreUsingGETParams` containing the following parameters:
   *
   * - `nombre`: nombre
   *
   * - `idDominio`: idDominio
   *
   * @return OK
   */
  getDomainsByIdAndNombreUsingGET(params: DomainService.GetDomainsByIdAndNombreUsingGETParams): __Observable<DetalleDominio> {
    return this.getDomainsByIdAndNombreUsingGETResponse(params).pipe(
      __map(_r => _r.body as DetalleDominio)
    );
  }

  /**
   * Crear nuevo registro de dominio
   * @param domain domain
   */
  saveDomainUsingPOSTResponse(domain: Domain): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = domain;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/domain/save`,
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
   * Crear nuevo registro de dominio
   * @param domain domain
   */
  saveDomainUsingPOST(domain: Domain): __Observable<null> {
    return this.saveDomainUsingPOSTResponse(domain).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module DomainService {

  /**
   * Parameters for getDomainsByIdAndIdDescriptionUsingGET
   */
  export interface GetDomainsByIdAndIdDescriptionUsingGETParams {

    /**
     * idDominio
     */
    idDominio: string;

    /**
     * idDetalle
     */
    idDetalle: string;
  }

  /**
   * Parameters for getDomainsByIdAndNombreUsingGET
   */
  export interface GetDomainsByIdAndNombreUsingGETParams {

    /**
     * nombre
     */
    nombre: string;

    /**
     * idDominio
     */
    idDominio: string;
  }
}

export { DomainService }
