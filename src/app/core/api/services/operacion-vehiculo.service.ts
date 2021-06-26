/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ItemMenu } from '../models/item-menu';

/**
 * Operacion Vehiculo Controller
 */
@Injectable({
  providedIn: 'root',
})
class OperacionVehiculoService extends __BaseService {
  static readonly getOperacionVehiculoUsingGETPath = '/operacionVehiculo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener los tipos de tramites posibles para cada vehículo
   * @return OK
   */
  getOperacionVehiculoUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ItemMenu>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/operacionVehiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ItemMenu>>;
      })
    );
  }
  /**
   * Obtener los tipos de tramites posibles para cada vehículo
   * @return OK
   */
  getOperacionVehiculoUsingGET(): __Observable<Array<ItemMenu>> {
    return this.getOperacionVehiculoUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ItemMenu>)
    );
  }
}

module OperacionVehiculoService {
}

export { OperacionVehiculoService }
