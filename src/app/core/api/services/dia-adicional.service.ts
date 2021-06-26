/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AdditionalDay } from '../models/additional-day';

/**
 * Dia Adicional Controller
 */
@Injectable({
  providedIn: 'root',
})
class DiaAdicionalService extends __BaseService {
  static readonly getByEstadoAdditionalDayUsingGETPath = '/diaAdicional';
  static readonly createAdditionalDayUsingPOSTPath = '/diaAdicional';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consulta el dia adicional activo en el sistema
   * @return OK
   */
  getByEstadoAdditionalDayUsingGETResponse(): __Observable<__StrictHttpResponse<AdditionalDay>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/diaAdicional`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AdditionalDay>;
      })
    );
  }
  /**
   * Consulta el dia adicional activo en el sistema
   * @return OK
   */
  getByEstadoAdditionalDayUsingGET(): __Observable<AdditionalDay> {
    return this.getByEstadoAdditionalDayUsingGETResponse().pipe(
      __map(_r => _r.body as AdditionalDay)
    );
  }

  /**
   * Crea el dia adicional enviado
   * @param additionalDay additionalDay
   * @return OK
   */
  createAdditionalDayUsingPOSTResponse(additionalDay: AdditionalDay): __Observable<__StrictHttpResponse<AdditionalDay>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = additionalDay;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/diaAdicional`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AdditionalDay>;
      })
    );
  }
  /**
   * Crea el dia adicional enviado
   * @param additionalDay additionalDay
   * @return OK
   */
  createAdditionalDayUsingPOST(additionalDay: AdditionalDay): __Observable<AdditionalDay> {
    return this.createAdditionalDayUsingPOSTResponse(additionalDay).pipe(
      __map(_r => _r.body as AdditionalDay)
    );
  }
}

module DiaAdicionalService {
}

export { DiaAdicionalService }
