/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RespuestaGenerica } from '../models/respuesta-generica';
import { PagoParam } from '../models/pago-param';

/**
 * Creditos BCO Controller
 */
@Injectable({
  providedIn: 'root',
})
class CreditosBCOService extends __BaseService {
  static readonly validarPagoTramiteUsingPOSTPath = '/CreditosBCO/validarPagoTramite';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Valida los pagos de un tramite
   * @param pagoParam pagoParam
   * @return OK
   */
  validarPagoTramiteUsingPOSTResponse(pagoParam: PagoParam): __Observable<__StrictHttpResponse<RespuestaGenerica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = pagoParam;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CreditosBCO/validarPagoTramite`,
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
   * Valida los pagos de un tramite
   * @param pagoParam pagoParam
   * @return OK
   */
  validarPagoTramiteUsingPOST(pagoParam: PagoParam): __Observable<RespuestaGenerica> {
    return this.validarPagoTramiteUsingPOSTResponse(pagoParam).pipe(
      __map(_r => _r.body as RespuestaGenerica)
    );
  }
}

module CreditosBCOService {
}

export { CreditosBCOService }
