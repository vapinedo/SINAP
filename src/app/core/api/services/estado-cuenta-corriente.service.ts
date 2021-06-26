/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { EstadoCuentaCorriente } from '../models/estado-cuenta-corriente';
import { EstadoCuentaVehiFilter } from '../models/estado-cuenta-vehi-filter';
import { EstadoCuentaToMainTable } from '../models/estado-cuenta-to-main-table';
import { EstadoCuentaFilter } from '../models/estado-cuenta-filter';

/**
 * Estado Cuenta Corriente Controller
 */
@Injectable({
  providedIn: 'root',
})
class EstadoCuentaCorrienteService extends __BaseService {
  static readonly getEstadoCuentaVehiculoUsingPOSTPath = '/estadoCuentaCorriente/getEstadoCuentaVehiculo';
  static readonly getVehiculosCuentaUsingPOSTPath = '/estadoCuentaCorriente/getVehiculosCuenta';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar cuenta corriente de un vehiculo especifico
   * @param estadoCuentaVehiFilter estadoCuentaVehiFilter
   * @return OK
   */
  getEstadoCuentaVehiculoUsingPOSTResponse(estadoCuentaVehiFilter: EstadoCuentaVehiFilter): __Observable<__StrictHttpResponse<EstadoCuentaCorriente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = estadoCuentaVehiFilter;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/estadoCuentaCorriente/getEstadoCuentaVehiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EstadoCuentaCorriente>;
      })
    );
  }
  /**
   * Consultar cuenta corriente de un vehiculo especifico
   * @param estadoCuentaVehiFilter estadoCuentaVehiFilter
   * @return OK
   */
  getEstadoCuentaVehiculoUsingPOST(estadoCuentaVehiFilter: EstadoCuentaVehiFilter): __Observable<EstadoCuentaCorriente> {
    return this.getEstadoCuentaVehiculoUsingPOSTResponse(estadoCuentaVehiFilter).pipe(
      __map(_r => _r.body as EstadoCuentaCorriente)
    );
  }

  /**
   * Consultar cuenta corrientes por RTN/PLACA/CONCEPTO
   * @param estadoCuentaFilter estadoCuentaFilter
   * @return OK
   */
  getVehiculosCuentaUsingPOSTResponse(estadoCuentaFilter: EstadoCuentaFilter): __Observable<__StrictHttpResponse<Array<EstadoCuentaToMainTable>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = estadoCuentaFilter;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/estadoCuentaCorriente/getVehiculosCuenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<EstadoCuentaToMainTable>>;
      })
    );
  }
  /**
   * Consultar cuenta corrientes por RTN/PLACA/CONCEPTO
   * @param estadoCuentaFilter estadoCuentaFilter
   * @return OK
   */
  getVehiculosCuentaUsingPOST(estadoCuentaFilter: EstadoCuentaFilter): __Observable<Array<EstadoCuentaToMainTable>> {
    return this.getVehiculosCuentaUsingPOSTResponse(estadoCuentaFilter).pipe(
      __map(_r => _r.body as Array<EstadoCuentaToMainTable>)
    );
  }
}

module EstadoCuentaCorrienteService {
}

export { EstadoCuentaCorrienteService }
