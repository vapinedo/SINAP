/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AutentificacionResponse } from '../models/autentificacion-response';
import { AutentificacionRequest } from '../models/autentificacion-request';

/**
 * Seguridad Controller
 */
@Injectable({
  providedIn: 'root',
})
class SeguridadControllerService extends __BaseService {
  static readonly loginAppUsingPOSTPath = '/seguridad/authenticate';
  static readonly refreshUsingGETPath = '/seguridad/refresh';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * loginApp
   * @param request request
   * @return OK
   */
  loginAppUsingPOSTResponse(request: AutentificacionRequest): __Observable<__StrictHttpResponse<AutentificacionResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/seguridad/authenticate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AutentificacionResponse>;
      })
    );
  }
  /**
   * loginApp
   * @param request request
   * @return OK
   */
  loginAppUsingPOST(request: AutentificacionRequest): __Observable<AutentificacionResponse> {
    return this.loginAppUsingPOSTResponse(request).pipe(
      __map(_r => _r.body as AutentificacionResponse)
    );
  }

  /**
   * refresh
   * @param Authorization Authorization
   * @return OK
   */
  refreshUsingGETResponse(Authorization: string): __Observable<__StrictHttpResponse<AutentificacionResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (Authorization != null) __headers = __headers.set('Authorization', Authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/seguridad/refresh`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AutentificacionResponse>;
      })
    );
  }
  /**
   * refresh
   * @param Authorization Authorization
   * @return OK
   */
  refreshUsingGET(Authorization: string): __Observable<AutentificacionResponse> {
    return this.refreshUsingGETResponse(Authorization).pipe(
      __map(_r => _r.body as AutentificacionResponse)
    );
  }
}

module SeguridadControllerService {
}

export { SeguridadControllerService }
