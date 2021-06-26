/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ItemMenu } from '../models/item-menu';
import { DetalleEstadoCuenta } from '../models/detalle-estado-cuenta';
import { ConsultaMatriculaToTable } from '../models/consulta-matricula-to-table';
import { FiltroConsultaMatricula } from '../models/filtro-consulta-matricula';
import { NovedadVehiculo } from '../models/novedad-vehiculo';
import { PlacaTramite } from '../models/placa-tramite';

/**
 * Prop Vehiculos Controller
 */
@Injectable({
  providedIn: 'root',
})
class PropVehiculosService extends __BaseService {
  static readonly callSpInsertVehiculoUsingPOSTPath = '/prop-vehiculos';
  static readonly getAfectacionesByRNTUsingGETPath = '/prop-vehiculos/get-afectaciones-by-rtn';
  static readonly getClasePlacasByRNTUsingGETPath = '/prop-vehiculos/get-clase-placas-by-rtn';
  static readonly getDetalleVehiculoUsingGETPath = '/prop-vehiculos/get-detalle-vehiculo/{iduVehiculo}';
  static readonly getEstadoCuentaUsingPOSTPath = '/prop-vehiculos/get-estado-cuenta';
  static readonly getTramitesRegistralesUsingPOSTPath = '/prop-vehiculos/tramitesRegistrales';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Generación tasas
   */
  callSpInsertVehiculoUsingPOSTResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/prop-vehiculos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Generación tasas
   */
  callSpInsertVehiculoUsingPOST(): __Observable<null> {
    return this.callSpInsertVehiculoUsingPOSTResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Obtener afectaciones (bloqueo) por RTN
   * @param params The `PropVehiculosService.GetAfectacionesByRNTUsingGETParams` containing the following parameters:
   *
   * - `rtn_numerico`: rtn_numerico
   *
   * - `rtn_alfanumerico`: rtn_alfanumerico
   *
   * @return OK
   */
  getAfectacionesByRNTUsingGETResponse(params: PropVehiculosService.GetAfectacionesByRNTUsingGETParams): __Observable<__StrictHttpResponse<Array<ItemMenu>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.rtnNumerico != null) __params = __params.set('rtn_numerico', params.rtnNumerico.toString());
    if (params.rtnAlfanumerico != null) __params = __params.set('rtn_alfanumerico', params.rtnAlfanumerico.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/prop-vehiculos/get-afectaciones-by-rtn`,
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
   * Obtener afectaciones (bloqueo) por RTN
   * @param params The `PropVehiculosService.GetAfectacionesByRNTUsingGETParams` containing the following parameters:
   *
   * - `rtn_numerico`: rtn_numerico
   *
   * - `rtn_alfanumerico`: rtn_alfanumerico
   *
   * @return OK
   */
  getAfectacionesByRNTUsingGET(params: PropVehiculosService.GetAfectacionesByRNTUsingGETParams): __Observable<Array<ItemMenu>> {
    return this.getAfectacionesByRNTUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<ItemMenu>)
    );
  }

  /**
   * Obtener clase de placas por RTN
   * @param params The `PropVehiculosService.GetClasePlacasByRNTUsingGETParams` containing the following parameters:
   *
   * - `rtn_numerico`: rtn_numerico
   *
   * - `rtn_alfanumerico`: rtn_alfanumerico
   *
   * @return OK
   */
  getClasePlacasByRNTUsingGETResponse(params: PropVehiculosService.GetClasePlacasByRNTUsingGETParams): __Observable<__StrictHttpResponse<Array<ItemMenu>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.rtnNumerico != null) __params = __params.set('rtn_numerico', params.rtnNumerico.toString());
    if (params.rtnAlfanumerico != null) __params = __params.set('rtn_alfanumerico', params.rtnAlfanumerico.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/prop-vehiculos/get-clase-placas-by-rtn`,
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
   * Obtener clase de placas por RTN
   * @param params The `PropVehiculosService.GetClasePlacasByRNTUsingGETParams` containing the following parameters:
   *
   * - `rtn_numerico`: rtn_numerico
   *
   * - `rtn_alfanumerico`: rtn_alfanumerico
   *
   * @return OK
   */
  getClasePlacasByRNTUsingGET(params: PropVehiculosService.GetClasePlacasByRNTUsingGETParams): __Observable<Array<ItemMenu>> {
    return this.getClasePlacasByRNTUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<ItemMenu>)
    );
  }

  /**
   * Obtener caracteristicas del vehiculo
   * @param iduVehiculo iduVehiculo
   * @return OK
   */
  getDetalleVehiculoUsingGETResponse(iduVehiculo: number): __Observable<__StrictHttpResponse<DetalleEstadoCuenta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/prop-vehiculos/get-detalle-vehiculo/${encodeURIComponent(String(iduVehiculo))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DetalleEstadoCuenta>;
      })
    );
  }
  /**
   * Obtener caracteristicas del vehiculo
   * @param iduVehiculo iduVehiculo
   * @return OK
   */
  getDetalleVehiculoUsingGET(iduVehiculo: number): __Observable<DetalleEstadoCuenta> {
    return this.getDetalleVehiculoUsingGETResponse(iduVehiculo).pipe(
      __map(_r => _r.body as DetalleEstadoCuenta)
    );
  }

  /**
   * Obtener estado de cuenta
   * @param filtro filtro
   * @return OK
   */
  getEstadoCuentaUsingPOSTResponse(filtro: FiltroConsultaMatricula): __Observable<__StrictHttpResponse<Array<ConsultaMatriculaToTable>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filtro;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/prop-vehiculos/get-estado-cuenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConsultaMatriculaToTable>>;
      })
    );
  }
  /**
   * Obtener estado de cuenta
   * @param filtro filtro
   * @return OK
   */
  getEstadoCuentaUsingPOST(filtro: FiltroConsultaMatricula): __Observable<Array<ConsultaMatriculaToTable>> {
    return this.getEstadoCuentaUsingPOSTResponse(filtro).pipe(
      __map(_r => _r.body as Array<ConsultaMatriculaToTable>)
    );
  }

  /**
   * Buscar por placa y trámite
   * @param placaTramite placaTramite
   * @return OK
   */
  getTramitesRegistralesUsingPOSTResponse(placaTramite: PlacaTramite): __Observable<__StrictHttpResponse<Array<NovedadVehiculo>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = placaTramite;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/prop-vehiculos/tramitesRegistrales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<NovedadVehiculo>>;
      })
    );
  }
  /**
   * Buscar por placa y trámite
   * @param placaTramite placaTramite
   * @return OK
   */
  getTramitesRegistralesUsingPOST(placaTramite: PlacaTramite): __Observable<Array<NovedadVehiculo>> {
    return this.getTramitesRegistralesUsingPOSTResponse(placaTramite).pipe(
      __map(_r => _r.body as Array<NovedadVehiculo>)
    );
  }
}

module PropVehiculosService {

  /**
   * Parameters for getAfectacionesByRNTUsingGET
   */
  export interface GetAfectacionesByRNTUsingGETParams {

    /**
     * rtn_numerico
     */
    rtnNumerico?: string;

    /**
     * rtn_alfanumerico
     */
    rtnAlfanumerico?: string;
  }

  /**
   * Parameters for getClasePlacasByRNTUsingGET
   */
  export interface GetClasePlacasByRNTUsingGETParams {

    /**
     * rtn_numerico
     */
    rtnNumerico?: string;

    /**
     * rtn_alfanumerico
     */
    rtnAlfanumerico?: string;
  }
}

export { PropVehiculosService }
