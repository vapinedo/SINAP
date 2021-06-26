/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PayCalendarCreate } from '../models/pay-calendar-create';
import { PayCalendar } from '../models/pay-calendar';
import { PayCalendarDelete } from '../models/pay-calendar-delete';
import { PayCalendarToTable } from '../models/pay-calendar-to-table';
import { PayCalendarToDetail } from '../models/pay-calendar-to-detail';

/**
 * Calendario Pago Controller
 */
@Injectable({
  providedIn: 'root',
})
class CalendarioPagoService extends __BaseService {
  static readonly createPayCalendarUsingPOSTPath = '/calendarioPago';
  static readonly updatePayCalendarUsingPUTPath = '/calendarioPago';
  static readonly deletePayCalendarUsingDELETEPath = '/calendarioPago';
  static readonly findAllPayCalendarUsingGETPath = '/calendarioPago/findAll';
  static readonly findByIdPayCalendarUsingGETPath = '/calendarioPago/findById';
  static readonly findDetailByIdPayCalendarUsingGETPath = '/calendarioPago/findDetailById';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Crear un calendario de pago
   * @param payCalendar payCalendar
   */
  createPayCalendarUsingPOSTResponse(payCalendar: PayCalendarCreate): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = payCalendar;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/calendarioPago`,
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
   * Crear un calendario de pago
   * @param payCalendar payCalendar
   */
  createPayCalendarUsingPOST(payCalendar: PayCalendarCreate): __Observable<null> {
    return this.createPayCalendarUsingPOSTResponse(payCalendar).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Actualizar un calendario de pago
   * @param calendar calendar
   */
  updatePayCalendarUsingPUTResponse(calendar: PayCalendar): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = calendar;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/calendarioPago`,
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
   * Actualizar un calendario de pago
   * @param calendar calendar
   */
  updatePayCalendarUsingPUT(calendar: PayCalendar): __Observable<null> {
    return this.updatePayCalendarUsingPUTResponse(calendar).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Eliminar logicamente un calendario de pago
   * @param payCalendarDelete payCalendarDelete
   */
  deletePayCalendarUsingDELETEResponse(payCalendarDelete: PayCalendarDelete): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = payCalendarDelete;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/calendarioPago`,
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
   * Eliminar logicamente un calendario de pago
   * @param payCalendarDelete payCalendarDelete
   */
  deletePayCalendarUsingDELETE(payCalendarDelete: PayCalendarDelete): __Observable<null> {
    return this.deletePayCalendarUsingDELETEResponse(payCalendarDelete).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Obtener calendarios de pago Activos e Inactivos
   * @return OK
   */
  findAllPayCalendarUsingGETResponse(): __Observable<__StrictHttpResponse<Array<PayCalendarToTable>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/calendarioPago/findAll`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PayCalendarToTable>>;
      })
    );
  }
  /**
   * Obtener calendarios de pago Activos e Inactivos
   * @return OK
   */
  findAllPayCalendarUsingGET(): __Observable<Array<PayCalendarToTable>> {
    return this.findAllPayCalendarUsingGETResponse().pipe(
      __map(_r => _r.body as Array<PayCalendarToTable>)
    );
  }

  /**
   * Obtener un calendario de pago por ID
   * @param id id
   * @return OK
   */
  findByIdPayCalendarUsingGETResponse(id: number): __Observable<__StrictHttpResponse<PayCalendar>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/calendarioPago/findById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PayCalendar>;
      })
    );
  }
  /**
   * Obtener un calendario de pago por ID
   * @param id id
   * @return OK
   */
  findByIdPayCalendarUsingGET(id: number): __Observable<PayCalendar> {
    return this.findByIdPayCalendarUsingGETResponse(id).pipe(
      __map(_r => _r.body as PayCalendar)
    );
  }

  /**
   * Obtener el detalle de un calendario de pago por ID
   * @param id id
   * @return OK
   */
  findDetailByIdPayCalendarUsingGETResponse(id: number): __Observable<__StrictHttpResponse<PayCalendarToDetail>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/calendarioPago/findDetailById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PayCalendarToDetail>;
      })
    );
  }
  /**
   * Obtener el detalle de un calendario de pago por ID
   * @param id id
   * @return OK
   */
  findDetailByIdPayCalendarUsingGET(id: number): __Observable<PayCalendarToDetail> {
    return this.findDetailByIdPayCalendarUsingGETResponse(id).pipe(
      __map(_r => _r.body as PayCalendarToDetail)
    );
  }
}

module CalendarioPagoService {
}

export { CalendarioPagoService }
