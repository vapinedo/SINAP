/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TarifaNormalRegistral } from '../models/tarifa-normal-registral';
import { RespuestaGenerica } from '../models/respuesta-generica';
import { TarifasCreate } from '../models/tarifas-create';
import { TarifasUpdate } from '../models/tarifas-update';
import { Tarifas } from '../models/tarifas';
import { TarifasParaMultas } from '../models/tarifas-para-multas';

/**
 * Tarifas Controller
 */
@Injectable({
  providedIn: 'root',
})
class TarifasService extends __BaseService {
  static readonly findAllTarifasUsingGETPath = '/tarifas';
  static readonly createTarifaUsingPOSTPath = '/tarifas';
  static readonly updateTarifaUsingPUTPath = '/tarifas';
  static readonly deleteTarifaUsingDELETEPath = '/tarifas';
  static readonly getTarifasActivasVigentesUsingGETPath = '/tarifas/findActivasVigentes';
  static readonly findAllActiveTarifasUsingGETPath = '/tarifas/findAllActive';
  static readonly findAllActiveInactiveTarifasUsingGETPath = '/tarifas/findAllActiveInactive';
  static readonly findByIdTarifaUsingGETPath = '/tarifas/findById';
  static readonly getTarifaByConceptoUsingGETPath = '/tarifas/findByIdConcepto';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un listado de todas las tarifas
   * @return OK
   */
  findAllTarifasUsingGETResponse(): __Observable<__StrictHttpResponse<Array<TarifaNormalRegistral>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tarifas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TarifaNormalRegistral>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las tarifas
   * @return OK
   */
  findAllTarifasUsingGET(): __Observable<Array<TarifaNormalRegistral>> {
    return this.findAllTarifasUsingGETResponse().pipe(
      __map(_r => _r.body as Array<TarifaNormalRegistral>)
    );
  }

  /**
   * Guardar tarifa
   * @param tarifasCreateDTO tarifasCreateDTO
   * @return OK
   */
  createTarifaUsingPOSTResponse(tarifasCreateDTO: TarifasCreate): __Observable<__StrictHttpResponse<RespuestaGenerica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tarifasCreateDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tarifas`,
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
   * Guardar tarifa
   * @param tarifasCreateDTO tarifasCreateDTO
   * @return OK
   */
  createTarifaUsingPOST(tarifasCreateDTO: TarifasCreate): __Observable<RespuestaGenerica> {
    return this.createTarifaUsingPOSTResponse(tarifasCreateDTO).pipe(
      __map(_r => _r.body as RespuestaGenerica)
    );
  }

  /**
   * Actualizar tarifa y sus parámetros
   * @param tarifasUpdateDTO tarifasUpdateDTO
   * @return OK
   */
  updateTarifaUsingPUTResponse(tarifasUpdateDTO: TarifasUpdate): __Observable<__StrictHttpResponse<RespuestaGenerica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tarifasUpdateDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tarifas`,
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
   * Actualizar tarifa y sus parámetros
   * @param tarifasUpdateDTO tarifasUpdateDTO
   * @return OK
   */
  updateTarifaUsingPUT(tarifasUpdateDTO: TarifasUpdate): __Observable<RespuestaGenerica> {
    return this.updateTarifaUsingPUTResponse(tarifasUpdateDTO).pipe(
      __map(_r => _r.body as RespuestaGenerica)
    );
  }

  /**
   * Eliminación logica de una tarifa
   * @param params The `TarifasService.DeleteTarifaUsingDELETEParams` containing the following parameters:
   *
   * - `observacion`: observacion
   *
   * - `id`: id
   *
   * @return OK
   */
  deleteTarifaUsingDELETEResponse(params: TarifasService.DeleteTarifaUsingDELETEParams): __Observable<__StrictHttpResponse<RespuestaGenerica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.observacion != null) __params = __params.set('observacion', params.observacion.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tarifas`,
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
   * Eliminación logica de una tarifa
   * @param params The `TarifasService.DeleteTarifaUsingDELETEParams` containing the following parameters:
   *
   * - `observacion`: observacion
   *
   * - `id`: id
   *
   * @return OK
   */
  deleteTarifaUsingDELETE(params: TarifasService.DeleteTarifaUsingDELETEParams): __Observable<RespuestaGenerica> {
    return this.deleteTarifaUsingDELETEResponse(params).pipe(
      __map(_r => _r.body as RespuestaGenerica)
    );
  }

  /**
   * Buscar tarifas en estado activo y dentro de las fechas de vigencia
   * @return OK
   */
  getTarifasActivasVigentesUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Tarifas>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tarifas/findActivasVigentes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Tarifas>>;
      })
    );
  }
  /**
   * Buscar tarifas en estado activo y dentro de las fechas de vigencia
   * @return OK
   */
  getTarifasActivasVigentesUsingGET(): __Observable<Array<Tarifas>> {
    return this.getTarifasActivasVigentesUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Tarifas>)
    );
  }

  /**
   * Obtener un listado de todas las tarifas en estado activo
   * @return OK
   */
  findAllActiveTarifasUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Tarifas>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tarifas/findAllActive`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Tarifas>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las tarifas en estado activo
   * @return OK
   */
  findAllActiveTarifasUsingGET(): __Observable<Array<Tarifas>> {
    return this.findAllActiveTarifasUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Tarifas>)
    );
  }

  /**
   * Obtener un listado de todas las tarifas en estado activo
   * @return OK
   */
  findAllActiveInactiveTarifasUsingGETResponse(): __Observable<__StrictHttpResponse<Array<TarifasParaMultas>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tarifas/findAllActiveInactive`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TarifasParaMultas>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las tarifas en estado activo
   * @return OK
   */
  findAllActiveInactiveTarifasUsingGET(): __Observable<Array<TarifasParaMultas>> {
    return this.findAllActiveInactiveTarifasUsingGETResponse().pipe(
      __map(_r => _r.body as Array<TarifasParaMultas>)
    );
  }

  /**
   * Obtiene una tarifa con el id recibido
   * @param id id
   * @return OK
   */
  findByIdTarifaUsingGETResponse(id: number): __Observable<__StrictHttpResponse<Tarifas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tarifas/findById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Tarifas>;
      })
    );
  }
  /**
   * Obtiene una tarifa con el id recibido
   * @param id id
   * @return OK
   */
  findByIdTarifaUsingGET(id: number): __Observable<Tarifas> {
    return this.findByIdTarifaUsingGETResponse(id).pipe(
      __map(_r => _r.body as Tarifas)
    );
  }

  /**
   * Buscar tarifas por el idConcepto
   * @param idConcepto idConcepto
   * @return OK
   */
  getTarifaByConceptoUsingGETResponse(idConcepto: number): __Observable<__StrictHttpResponse<Array<TarifasParaMultas>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConcepto != null) __params = __params.set('idConcepto', idConcepto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tarifas/findByIdConcepto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TarifasParaMultas>>;
      })
    );
  }
  /**
   * Buscar tarifas por el idConcepto
   * @param idConcepto idConcepto
   * @return OK
   */
  getTarifaByConceptoUsingGET(idConcepto: number): __Observable<Array<TarifasParaMultas>> {
    return this.getTarifaByConceptoUsingGETResponse(idConcepto).pipe(
      __map(_r => _r.body as Array<TarifasParaMultas>)
    );
  }
}

module TarifasService {

  /**
   * Parameters for deleteTarifaUsingDELETE
   */
  export interface DeleteTarifaUsingDELETEParams {

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

export { TarifasService }
