/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Vigencias } from '../models/vigencias';
import { VigenciasCreate } from '../models/vigencias-create';
import { VigenciasUpdate } from '../models/vigencias-update';
import { VigenciasValoresUnicos } from '../models/vigencias-valores-unicos';

/**
 * Vigencias Controller
 */
@Injectable({
  providedIn: 'root',
})
class VigenciasService extends __BaseService {
  static readonly findAllVigenciasUsingGETPath = '/vigencias';
  static readonly saveVigenciaUsingPOSTPath = '/vigencias';
  static readonly updateVigenciaUsingPUTPath = '/vigencias';
  static readonly deleteVigenciaUsingDELETEPath = '/vigencias';
  static readonly getVigenciaByKeyUniqueUsingPOSTPath = '/vigencias/findByValoresUnicos';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar todas la vigencias activas e inactivas
   * @return OK
   */
  findAllVigenciasUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Vigencias>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vigencias`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Vigencias>>;
      })
    );
  }
  /**
   * Consultar todas la vigencias activas e inactivas
   * @return OK
   */
  findAllVigenciasUsingGET(): __Observable<Array<Vigencias>> {
    return this.findAllVigenciasUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Vigencias>)
    );
  }

  /**
   * Guardar una vigencia
   * @param vigencia vigencia
   */
  saveVigenciaUsingPOSTResponse(vigencia: VigenciasCreate): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = vigencia;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vigencias`,
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
   * Guardar una vigencia
   * @param vigencia vigencia
   */
  saveVigenciaUsingPOST(vigencia: VigenciasCreate): __Observable<null> {
    return this.saveVigenciaUsingPOSTResponse(vigencia).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Actualizar vigencias
   * @param vigencia vigencia
   */
  updateVigenciaUsingPUTResponse(vigencia: VigenciasUpdate): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = vigencia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/vigencias`,
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
   * Actualizar vigencias
   * @param vigencia vigencia
   */
  updateVigenciaUsingPUT(vigencia: VigenciasUpdate): __Observable<null> {
    return this.updateVigenciaUsingPUTResponse(vigencia).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Eliminado lógico vigencia
   * @param params The `VigenciasService.DeleteVigenciaUsingDELETEParams` containing the following parameters:
   *
   * - `observaciones`: observaciones
   *
   * - `idVigencia`: idVigencia
   */
  deleteVigenciaUsingDELETEResponse(params: VigenciasService.DeleteVigenciaUsingDELETEParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.observaciones != null) __params = __params.set('observaciones', params.observaciones.toString());
    if (params.idVigencia != null) __params = __params.set('idVigencia', params.idVigencia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/vigencias`,
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
   * Eliminado lógico vigencia
   * @param params The `VigenciasService.DeleteVigenciaUsingDELETEParams` containing the following parameters:
   *
   * - `observaciones`: observaciones
   *
   * - `idVigencia`: idVigencia
   */
  deleteVigenciaUsingDELETE(params: VigenciasService.DeleteVigenciaUsingDELETEParams): __Observable<null> {
    return this.deleteVigenciaUsingDELETEResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Buscar vigencias por su llave única
   * @param vigencia vigencia
   * @return OK
   */
  getVigenciaByKeyUniqueUsingPOSTResponse(vigencia: VigenciasValoresUnicos): __Observable<__StrictHttpResponse<Array<Vigencias>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = vigencia;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vigencias/findByValoresUnicos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Vigencias>>;
      })
    );
  }
  /**
   * Buscar vigencias por su llave única
   * @param vigencia vigencia
   * @return OK
   */
  getVigenciaByKeyUniqueUsingPOST(vigencia: VigenciasValoresUnicos): __Observable<Array<Vigencias>> {
    return this.getVigenciaByKeyUniqueUsingPOSTResponse(vigencia).pipe(
      __map(_r => _r.body as Array<Vigencias>)
    );
  }
}

module VigenciasService {

  /**
   * Parameters for deleteVigenciaUsingDELETE
   */
  export interface DeleteVigenciaUsingDELETEParams {

    /**
     * observaciones
     */
    observaciones: string;

    /**
     * idVigencia
     */
    idVigencia: number;
  }
}

export { VigenciasService }
