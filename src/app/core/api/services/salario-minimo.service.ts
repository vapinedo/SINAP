/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Salary } from '../models/salary';

/**
 * Salario Minimo Controller
 */
@Injectable({
  providedIn: 'root',
})
class SalarioMinimoService extends __BaseService {
  static readonly updateSalaryForPeriodUsingPUTPath = '/salarioMinimo';
  static readonly getSalaryForPeriodUsingGETPath = '/salarioMinimo/{periodo}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Actualizar la el salario minimo enviado
   * @param salary salary
   * @return OK
   */
  updateSalaryForPeriodUsingPUTResponse(salary: Salary): __Observable<__StrictHttpResponse<Salary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = salary;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/salarioMinimo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Salary>;
      })
    );
  }
  /**
   * Actualizar la el salario minimo enviado
   * @param salary salary
   * @return OK
   */
  updateSalaryForPeriodUsingPUT(salary: Salary): __Observable<Salary> {
    return this.updateSalaryForPeriodUsingPUTResponse(salary).pipe(
      __map(_r => _r.body as Salary)
    );
  }

  /**
   * Consulta el salario minimo vigente para el periodo enviado
   * @param periodo periodo
   * @return OK
   */
  getSalaryForPeriodUsingGETResponse(periodo: number): __Observable<__StrictHttpResponse<Salary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/salarioMinimo/${encodeURIComponent(String(periodo))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Salary>;
      })
    );
  }
  /**
   * Consulta el salario minimo vigente para el periodo enviado
   * @param periodo periodo
   * @return OK
   */
  getSalaryForPeriodUsingGET(periodo: number): __Observable<Salary> {
    return this.getSalaryForPeriodUsingGETResponse(periodo).pipe(
      __map(_r => _r.body as Salary)
    );
  }
}

module SalarioMinimoService {
}

export { SalarioMinimoService }
