/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AsignaVarConcepto } from '../models/asigna-var-concepto';

/**
 * Asigna Var Concepto Controller
 */
@Injectable({
  providedIn: 'root',
})
class AsignaVarConceptoService extends __BaseService {
  static readonly findAllActiveUsingGETPath = '/asignaVarConcepto';
  static readonly findByIdCondicionTarifaUsingGETPath = '/asignaVarConcepto/{idCondTarifa}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un listado de todas las asignaciones de configuración en estado activo
   * @return OK
   */
  findAllActiveUsingGETResponse(): __Observable<__StrictHttpResponse<Array<AsignaVarConcepto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/asignaVarConcepto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AsignaVarConcepto>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las asignaciones de configuración en estado activo
   * @return OK
   */
  findAllActiveUsingGET(): __Observable<Array<AsignaVarConcepto>> {
    return this.findAllActiveUsingGETResponse().pipe(
      __map(_r => _r.body as Array<AsignaVarConcepto>)
    );
  }

  /**
   * Obtener un listado de todas las asignaciones de configuración en estado activo consultadas por condición de tarifa
   * @param idCondTarifa idCondTarifa
   * @return OK
   */
  findByIdCondicionTarifaUsingGETResponse(idCondTarifa: number): __Observable<__StrictHttpResponse<Array<AsignaVarConcepto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/asignaVarConcepto/${encodeURIComponent(String(idCondTarifa))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AsignaVarConcepto>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las asignaciones de configuración en estado activo consultadas por condición de tarifa
   * @param idCondTarifa idCondTarifa
   * @return OK
   */
  findByIdCondicionTarifaUsingGET(idCondTarifa: number): __Observable<Array<AsignaVarConcepto>> {
    return this.findByIdCondicionTarifaUsingGETResponse(idCondTarifa).pipe(
      __map(_r => _r.body as Array<AsignaVarConcepto>)
    );
  }
}

module AsignaVarConceptoService {
}

export { AsignaVarConceptoService }
