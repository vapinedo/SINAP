/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TipoVehiculo } from '../models/tipo-vehiculo';
import { ItemMenuValorMulta } from '../models/item-menu-valor-multa';

/**
 * Vehicle Type Controller
 */
@Injectable({
  providedIn: 'root',
})
class VehicleTypeService extends __BaseService {
  static readonly findByIdUsingGETPath = '/vehicleType/findByTipo';
  static readonly getVehicleTypeUsingGETPath = '/vehicleType/getVehicleType';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un tipo de vehículo por id
   * @param tipo tipo
   * @return OK
   */
  findByIdUsingGETResponse(tipo: string): __Observable<__StrictHttpResponse<TipoVehiculo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (tipo != null) __params = __params.set('tipo', tipo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vehicleType/findByTipo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TipoVehiculo>;
      })
    );
  }
  /**
   * Obtener un tipo de vehículo por id
   * @param tipo tipo
   * @return OK
   */
  findByIdUsingGET(tipo: string): __Observable<TipoVehiculo> {
    return this.findByIdUsingGETResponse(tipo).pipe(
      __map(_r => _r.body as TipoVehiculo)
    );
  }

  /**
   * Obtener los tipos de vehiculos del sistema
   * @return OK
   */
  getVehicleTypeUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ItemMenuValorMulta>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vehicleType/getVehicleType`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ItemMenuValorMulta>>;
      })
    );
  }
  /**
   * Obtener los tipos de vehiculos del sistema
   * @return OK
   */
  getVehicleTypeUsingGET(): __Observable<Array<ItemMenuValorMulta>> {
    return this.getVehicleTypeUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ItemMenuValorMulta>)
    );
  }
}

module VehicleTypeService {
}

export { VehicleTypeService }
