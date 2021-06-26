/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PlateClassDTO } from '../models/plate-class-dto';

/**
 * Plate Class Controller
 */
@Injectable({
  providedIn: 'root',
})
class PlateClassService extends __BaseService {
  static readonly findByIdPlacaUsingGETPath = '/plateClass/findByIdPlaca';
  static readonly getPlateClassUsingGETPath = '/plateClass/getPlateClass';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * findByIdPlaca
   * @param clase clase
   * @return OK
   */
  findByIdPlacaUsingGETResponse(clase?: string): __Observable<__StrictHttpResponse<PlateClassDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (clase != null) __params = __params.set('clase', clase.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/plateClass/findByIdPlaca`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PlateClassDTO>;
      })
    );
  }
  /**
   * findByIdPlaca
   * @param clase clase
   * @return OK
   */
  findByIdPlacaUsingGET(clase?: string): __Observable<PlateClassDTO> {
    return this.findByIdPlacaUsingGETResponse(clase).pipe(
      __map(_r => _r.body as PlateClassDTO)
    );
  }

  /**
   * getPlateClass
   * @param id id
   * @return OK
   */
  getPlateClassUsingGETResponse(id?: string): __Observable<__StrictHttpResponse<Array<PlateClassDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/plateClass/getPlateClass`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PlateClassDTO>>;
      })
    );
  }
  /**
   * getPlateClass
   * @param id id
   * @return OK
   */
  getPlateClassUsingGET(id?: string): __Observable<Array<PlateClassDTO>> {
    return this.getPlateClassUsingGETResponse(id).pipe(
      __map(_r => _r.body as Array<PlateClassDTO>)
    );
  }
}

module PlateClassService {
}

export { PlateClassService }
