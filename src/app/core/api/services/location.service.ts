/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DepartamentoMunicipio } from '../models/departamento-municipio';
import { Department } from '../models/department';
import { Municipality } from '../models/municipality';

/**
 * Geo Controller
 */
@Injectable({
  providedIn: 'root',
})
class LocationService extends __BaseService {
  static readonly getDepartamentoMunicipioUsingGETPath = '/location/departamentoMunicipio';
  static readonly getDepartmentsLocationUsingGETPath = '/location/department/allActive';
  static readonly getMunicipalitiesLocationUsingGETPath = '/location/municipality/allActive';
  static readonly getMunicipalitiesDepartmentsLocationUsingGETPath = '/location/municipality/byDepartments';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obteniene un registro con los ids y nombres de departamentoy municipios consultados por su respectiva llave primaria
   * @param params The `LocationService.GetDepartamentoMunicipioUsingGETParams` containing the following parameters:
   *
   * - `idMunicipio`: idMunicipio
   *
   * - `idDepartamento`: idDepartamento
   *
   * @return OK
   */
  getDepartamentoMunicipioUsingGETResponse(params: LocationService.GetDepartamentoMunicipioUsingGETParams): __Observable<__StrictHttpResponse<DepartamentoMunicipio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idMunicipio != null) __params = __params.set('idMunicipio', params.idMunicipio.toString());
    if (params.idDepartamento != null) __params = __params.set('idDepartamento', params.idDepartamento.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/departamentoMunicipio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DepartamentoMunicipio>;
      })
    );
  }
  /**
   * Obteniene un registro con los ids y nombres de departamentoy municipios consultados por su respectiva llave primaria
   * @param params The `LocationService.GetDepartamentoMunicipioUsingGETParams` containing the following parameters:
   *
   * - `idMunicipio`: idMunicipio
   *
   * - `idDepartamento`: idDepartamento
   *
   * @return OK
   */
  getDepartamentoMunicipioUsingGET(params: LocationService.GetDepartamentoMunicipioUsingGETParams): __Observable<DepartamentoMunicipio> {
    return this.getDepartamentoMunicipioUsingGETResponse(params).pipe(
      __map(_r => _r.body as DepartamentoMunicipio)
    );
  }

  /**
   * Obtener listado de departamentos en estado activo
   * @return OK
   */
  getDepartmentsLocationUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Department>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/department/allActive`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Department>>;
      })
    );
  }
  /**
   * Obtener listado de departamentos en estado activo
   * @return OK
   */
  getDepartmentsLocationUsingGET(): __Observable<Array<Department>> {
    return this.getDepartmentsLocationUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Department>)
    );
  }

  /**
   * Obtener listado de municipios en estado activo
   * @return OK
   */
  getMunicipalitiesLocationUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Municipality>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/municipality/allActive`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Municipality>>;
      })
    );
  }
  /**
   * Obtener listado de municipios en estado activo
   * @return OK
   */
  getMunicipalitiesLocationUsingGET(): __Observable<Array<Municipality>> {
    return this.getMunicipalitiesLocationUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Municipality>)
    );
  }

  /**
   * Obtener listado de municipios en estado activo para los departamentos enviados
   * @param departamentos departamentos
   * @return OK
   */
  getMunicipalitiesDepartmentsLocationUsingGETResponse(departamentos: Array<number>): __Observable<__StrictHttpResponse<Array<Municipality>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (departamentos || []).forEach(val => {if (val != null) __params = __params.append('departamentos', val.toString())});
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/municipality/byDepartments`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Municipality>>;
      })
    );
  }
  /**
   * Obtener listado de municipios en estado activo para los departamentos enviados
   * @param departamentos departamentos
   * @return OK
   */
  getMunicipalitiesDepartmentsLocationUsingGET(departamentos: Array<number>): __Observable<Array<Municipality>> {
    return this.getMunicipalitiesDepartmentsLocationUsingGETResponse(departamentos).pipe(
      __map(_r => _r.body as Array<Municipality>)
    );
  }
}

module LocationService {

  /**
   * Parameters for getDepartamentoMunicipioUsingGET
   */
  export interface GetDepartamentoMunicipioUsingGETParams {

    /**
     * idMunicipio
     */
    idMunicipio: number;

    /**
     * idDepartamento
     */
    idDepartamento: number;
  }
}

export { LocationService }
