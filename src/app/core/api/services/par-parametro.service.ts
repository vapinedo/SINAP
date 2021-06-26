/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Parameter } from '../models/parameter';

/**
 * Par Parametro Controller
 */
@Injectable({
  providedIn: 'root',
})
class ParParametroService extends __BaseService {
  static readonly updateParParametroUsingPUTPath = '/parParametro';
  static readonly getByIdParParameterUsingGETPath = '/parParametro/{parametro}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Actualizar el Par parametro enviado
   * @param parameter parameter
   * @return OK
   */
  updateParParametroUsingPUTResponse(parameter: Parameter): __Observable<__StrictHttpResponse<Parameter>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = parameter;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/parParametro`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Parameter>;
      })
    );
  }
  /**
   * Actualizar el Par parametro enviado
   * @param parameter parameter
   * @return OK
   */
  updateParParametroUsingPUT(parameter: Parameter): __Observable<Parameter> {
    return this.updateParParametroUsingPUTResponse(parameter).pipe(
      __map(_r => _r.body as Parameter)
    );
  }

  /**
   * Consulta el parametro para el id (parametro) enviado
   * @param parametro parametro
   * @return OK
   */
  getByIdParParameterUsingGETResponse(parametro: string): __Observable<__StrictHttpResponse<Parameter>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/parParametro/${encodeURIComponent(String(parametro))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Parameter>;
      })
    );
  }
  /**
   * Consulta el parametro para el id (parametro) enviado
   * @param parametro parametro
   * @return OK
   */
  getByIdParParameterUsingGET(parametro: string): __Observable<Parameter> {
    return this.getByIdParParameterUsingGETResponse(parametro).pipe(
      __map(_r => _r.body as Parameter)
    );
  }
}

module ParParametroService {
}

export { ParParametroService }
