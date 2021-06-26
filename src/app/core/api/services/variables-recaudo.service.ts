/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { VariablesRecaudo } from '../models/variables-recaudo';

/**
 * Variables Recaudo Controller
 */
@Injectable({
  providedIn: 'root',
})
class VariablesRecaudoService extends __BaseService {
  static readonly findAllVariablesRecaudoUsingGETPath = '/variablesRecaudo';
  static readonly findAllActiveUsingGET1Path = '/variablesRecaudo/sinPlaca';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un listado de todas las variables de recaudo
   * @return OK
   */
  findAllVariablesRecaudoUsingGETResponse(): __Observable<__StrictHttpResponse<Array<VariablesRecaudo>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/variablesRecaudo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VariablesRecaudo>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las variables de recaudo
   * @return OK
   */
  findAllVariablesRecaudoUsingGET(): __Observable<Array<VariablesRecaudo>> {
    return this.findAllVariablesRecaudoUsingGETResponse().pipe(
      __map(_r => _r.body as Array<VariablesRecaudo>)
    );
  }

  /**
   * Obtener un listado de todas las tarifas excepto la clase placa
   * @return OK
   */
  findAllActiveUsingGET1Response(): __Observable<__StrictHttpResponse<Array<VariablesRecaudo>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/variablesRecaudo/sinPlaca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VariablesRecaudo>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las tarifas excepto la clase placa
   * @return OK
   */
  findAllActiveUsingGET1(): __Observable<Array<VariablesRecaudo>> {
    return this.findAllActiveUsingGET1Response().pipe(
      __map(_r => _r.body as Array<VariablesRecaudo>)
    );
  }
}

module VariablesRecaudoService {
}

export { VariablesRecaudoService }
