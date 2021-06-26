/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TarifasMunicipios } from '../models/tarifas-municipios';

/**
 * Tarifas Municipios Controller
 */
@Injectable({
  providedIn: 'root',
})
class TarifasMunicipiosService extends __BaseService {
  static readonly findAllUsingGETPath = '/tarifasMunicipios';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un listado de todas las tarifas con los municipios asociados
   * @return OK
   */
  findAllUsingGETResponse(): __Observable<__StrictHttpResponse<Array<TarifasMunicipios>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tarifasMunicipios`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TarifasMunicipios>>;
      })
    );
  }
  /**
   * Obtener un listado de todas las tarifas con los municipios asociados
   * @return OK
   */
  findAllUsingGET(): __Observable<Array<TarifasMunicipios>> {
    return this.findAllUsingGETResponse().pipe(
      __map(_r => _r.body as Array<TarifasMunicipios>)
    );
  }
}

module TarifasMunicipiosService {
}

export { TarifasMunicipiosService }
