/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BusinessDay } from '../models/business-day';

/**
 * Dias Habiles Controller
 */
@Injectable({
  providedIn: 'root',
})
class DiasHabilesService extends __BaseService {
  static readonly getNonBusinessDaysUsingGETPath = '/diasHabiles';
  static readonly saveNonBusinessDaysUsingPUTPath = '/diasHabiles';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consulta la lista de dias habiles
   * @return OK
   */
  getNonBusinessDaysUsingGETResponse(): __Observable<__StrictHttpResponse<Array<BusinessDay>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/diasHabiles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<BusinessDay>>;
      })
    );
  }
  /**
   * Consulta la lista de dias habiles
   * @return OK
   */
  getNonBusinessDaysUsingGET(): __Observable<Array<BusinessDay>> {
    return this.getNonBusinessDaysUsingGETResponse().pipe(
      __map(_r => _r.body as Array<BusinessDay>)
    );
  }

  /**
   * Actualizar la lista de dias habiles
   * @param businessDays businessDays
   * @return OK
   */
  saveNonBusinessDaysUsingPUTResponse(businessDays: Array<BusinessDay>): __Observable<__StrictHttpResponse<Array<BusinessDay>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = businessDays;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/diasHabiles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<BusinessDay>>;
      })
    );
  }
  /**
   * Actualizar la lista de dias habiles
   * @param businessDays businessDays
   * @return OK
   */
  saveNonBusinessDaysUsingPUT(businessDays: Array<BusinessDay>): __Observable<Array<BusinessDay>> {
    return this.saveNonBusinessDaysUsingPUTResponse(businessDays).pipe(
      __map(_r => _r.body as Array<BusinessDay>)
    );
  }
}

module DiasHabilesService {
}

export { DiasHabilesService }
