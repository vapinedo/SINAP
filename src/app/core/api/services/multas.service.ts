/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Multas } from '../models/multas';
import { RespuestaGenerica } from '../models/respuesta-generica';
import { MultasCreate } from '../models/multas-create';
import { MultasUpdate } from '../models/multas-update';

/**
 * Multas Controller
 */
@Injectable({
  providedIn: 'root',
})
class MultasService extends __BaseService {
  static readonly findAllMultasUsingGETPath = '/multas';
  static readonly createMultaUsingPOSTPath = '/multas';
  static readonly updateMultaUsingPUTPath = '/multas';
  static readonly deleteMultaUsingDELETEPath = '/multas';
  static readonly findAllActiveMultasUsingGETPath = '/multas/findAllActive';
  static readonly findByIdMultaUsingGETPath = '/multas/id';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un listado de todas las multas
   * @return OK
   */
  findAllMultasUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Multas>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/multas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Multas>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las multas
   * @return OK
   */
  findAllMultasUsingGET(): __Observable<Array<Multas>> {
    return this.findAllMultasUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Multas>)
    );
  }

  /**
   * Crear multa
   * @param multaCreateDTO multaCreateDTO
   * @return OK
   */
  createMultaUsingPOSTResponse(multaCreateDTO: MultasCreate): __Observable<__StrictHttpResponse<RespuestaGenerica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = multaCreateDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/multas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RespuestaGenerica>;
      })
    );
  }
  /**
   * Crear multa
   * @param multaCreateDTO multaCreateDTO
   * @return OK
   */
  createMultaUsingPOST(multaCreateDTO: MultasCreate): __Observable<RespuestaGenerica> {
    return this.createMultaUsingPOSTResponse(multaCreateDTO).pipe(
      __map(_r => _r.body as RespuestaGenerica)
    );
  }

  /**
   * Actualizar multa, sus municipios y sus parámetros
   * @param tarifasUpdateDTO tarifasUpdateDTO
   * @return OK
   */
  updateMultaUsingPUTResponse(tarifasUpdateDTO: MultasUpdate): __Observable<__StrictHttpResponse<RespuestaGenerica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tarifasUpdateDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/multas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RespuestaGenerica>;
      })
    );
  }
  /**
   * Actualizar multa, sus municipios y sus parámetros
   * @param tarifasUpdateDTO tarifasUpdateDTO
   * @return OK
   */
  updateMultaUsingPUT(tarifasUpdateDTO: MultasUpdate): __Observable<RespuestaGenerica> {
    return this.updateMultaUsingPUTResponse(tarifasUpdateDTO).pipe(
      __map(_r => _r.body as RespuestaGenerica)
    );
  }

  /**
   * Eliminación logica de una multa
   * @param params The `MultasService.DeleteMultaUsingDELETEParams` containing the following parameters:
   *
   * - `observacion`: observacion
   *
   * - `id`: id
   *
   * @return OK
   */
  deleteMultaUsingDELETEResponse(params: MultasService.DeleteMultaUsingDELETEParams): __Observable<__StrictHttpResponse<RespuestaGenerica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.observacion != null) __params = __params.set('observacion', params.observacion.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/multas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RespuestaGenerica>;
      })
    );
  }
  /**
   * Eliminación logica de una multa
   * @param params The `MultasService.DeleteMultaUsingDELETEParams` containing the following parameters:
   *
   * - `observacion`: observacion
   *
   * - `id`: id
   *
   * @return OK
   */
  deleteMultaUsingDELETE(params: MultasService.DeleteMultaUsingDELETEParams): __Observable<RespuestaGenerica> {
    return this.deleteMultaUsingDELETEResponse(params).pipe(
      __map(_r => _r.body as RespuestaGenerica)
    );
  }

  /**
   * Obtener un listado de todas las multas en estado activo
   * @return OK
   */
  findAllActiveMultasUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Multas>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/multas/findAllActive`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Multas>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las multas en estado activo
   * @return OK
   */
  findAllActiveMultasUsingGET(): __Observable<Array<Multas>> {
    return this.findAllActiveMultasUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Multas>)
    );
  }

  /**
   * Obtiene una multa con el id recibido
   * @param id id
   * @return OK
   */
  findByIdMultaUsingGETResponse(id: number): __Observable<__StrictHttpResponse<Multas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/multas/id`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Multas>;
      })
    );
  }
  /**
   * Obtiene una multa con el id recibido
   * @param id id
   * @return OK
   */
  findByIdMultaUsingGET(id: number): __Observable<Multas> {
    return this.findByIdMultaUsingGETResponse(id).pipe(
      __map(_r => _r.body as Multas)
    );
  }
}

module MultasService {

  /**
   * Parameters for deleteMultaUsingDELETE
   */
  export interface DeleteMultaUsingDELETEParams {

    /**
     * observacion
     */
    observacion: string;

    /**
     * id
     */
    id: number;
  }
}

export { MultasService }
