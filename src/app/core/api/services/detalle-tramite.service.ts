/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DetalleTramiteBanco } from '../models/detalle-tramite-banco';
import { DetalleTramite } from '../models/detalle-tramite';

/**
 * Detalle Tramite Controller
 */
@Injectable({
  providedIn: 'root',
})
class DetalleTramiteService extends __BaseService {
  static readonly findAllDetalleTramiteBancoUsingGETPath = '/detalleTramite/banco';
  static readonly findAllDetalleTramiteIPUsingGETPath = '/detalleTramite/ip';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un listado de los detalles de los tramites del Banco
   * @param nroIduVehiculo nroIduVehiculo
   * @return OK
   */
  findAllDetalleTramiteBancoUsingGETResponse(nroIduVehiculo: number): __Observable<__StrictHttpResponse<Array<DetalleTramiteBanco>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (nroIduVehiculo != null) __params = __params.set('nroIduVehiculo', nroIduVehiculo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/detalleTramite/banco`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<DetalleTramiteBanco>>;
      })
    );
  }
  /**
   * Obtener un listado de los detalles de los tramites del Banco
   * @param nroIduVehiculo nroIduVehiculo
   * @return OK
   */
  findAllDetalleTramiteBancoUsingGET(nroIduVehiculo: number): __Observable<Array<DetalleTramiteBanco>> {
    return this.findAllDetalleTramiteBancoUsingGETResponse(nroIduVehiculo).pipe(
      __map(_r => _r.body as Array<DetalleTramiteBanco>)
    );
  }

  /**
   * Obtener un listado de los detalles de los tramites del IP
   * @param nroIduVehiculo nroIduVehiculo
   * @return OK
   */
  findAllDetalleTramiteIPUsingGETResponse(nroIduVehiculo: number): __Observable<__StrictHttpResponse<Array<DetalleTramite>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (nroIduVehiculo != null) __params = __params.set('nroIduVehiculo', nroIduVehiculo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/detalleTramite/ip`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<DetalleTramite>>;
      })
    );
  }
  /**
   * Obtener un listado de los detalles de los tramites del IP
   * @param nroIduVehiculo nroIduVehiculo
   * @return OK
   */
  findAllDetalleTramiteIPUsingGET(nroIduVehiculo: number): __Observable<Array<DetalleTramite>> {
    return this.findAllDetalleTramiteIPUsingGETResponse(nroIduVehiculo).pipe(
      __map(_r => _r.body as Array<DetalleTramite>)
    );
  }
}

module DetalleTramiteService {
}

export { DetalleTramiteService }
