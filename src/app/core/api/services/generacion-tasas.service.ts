/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GeneracionTasaOutput } from '../models/generacion-tasa-output';
import { GeneracionTasaInput } from '../models/generacion-tasa-input';

/**
 * Generacion Tasas Controller
 */
@Injectable({
  providedIn: 'root',
})
class GeneracionTasasService extends __BaseService {
  static readonly postUsingPOSTPath = '/GeneracionTasas';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Generar Tasa Individual
   * @param input input
   * @return OK
   */
  postUsingPOSTResponse(input: GeneracionTasaInput): __Observable<__StrictHttpResponse<GeneracionTasaOutput>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = input;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GeneracionTasas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeneracionTasaOutput>;
      })
    );
  }
  /**
   * Generar Tasa Individual
   * @param input input
   * @return OK
   */
  postUsingPOST(input: GeneracionTasaInput): __Observable<GeneracionTasaOutput> {
    return this.postUsingPOSTResponse(input).pipe(
      __map(_r => _r.body as GeneracionTasaOutput)
    );
  }
}

module GeneracionTasasService {
}

export { GeneracionTasasService }
