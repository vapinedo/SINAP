/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PrescriptionToTable } from '../models/prescription-to-table';
import { PrescriptionCreate } from '../models/prescription-create';
import { PrescriptionDelete } from '../models/prescription-delete';
import { PrescriptionUpdate } from '../models/prescription-update';
import { PrescriptionToDetail } from '../models/prescription-to-detail';

/**
 * Par Prescripcion Controller
 */
@Injectable({
  providedIn: 'root',
})
class PrescriptionService extends __BaseService {
  static readonly getPrescriptionsUsingGETPath = '/prescription';
  static readonly savePrescriptionUsingPOSTPath = '/prescription';
  static readonly deletePrescriptionUsingDELETEPath = '/prescription';
  static readonly updatePrescriptionUsingPATCHPath = '/prescription';
  static readonly getPrescriptionsByidUsingGETPath = '/prescription/get-by-id/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener prescripciones con estado Activo e Inactivo
   * @return OK
   */
  getPrescriptionsUsingGETResponse(): __Observable<__StrictHttpResponse<Array<PrescriptionToTable>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/prescription`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PrescriptionToTable>>;
      })
    );
  }
  /**
   * Obtener prescripciones con estado Activo e Inactivo
   * @return OK
   */
  getPrescriptionsUsingGET(): __Observable<Array<PrescriptionToTable>> {
    return this.getPrescriptionsUsingGETResponse().pipe(
      __map(_r => _r.body as Array<PrescriptionToTable>)
    );
  }

  /**
   * Crear nuevo registro de prescripción
   * @param prescriptionCreate prescriptionCreate
   * @return Created
   */
  savePrescriptionUsingPOSTResponse(prescriptionCreate: PrescriptionCreate): __Observable<__StrictHttpResponse<PrescriptionCreate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = prescriptionCreate;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/prescription`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PrescriptionCreate>;
      })
    );
  }
  /**
   * Crear nuevo registro de prescripción
   * @param prescriptionCreate prescriptionCreate
   * @return Created
   */
  savePrescriptionUsingPOST(prescriptionCreate: PrescriptionCreate): __Observable<PrescriptionCreate> {
    return this.savePrescriptionUsingPOSTResponse(prescriptionCreate).pipe(
      __map(_r => _r.body as PrescriptionCreate)
    );
  }

  /**
   * Eliminar registro de prescripción
   * @param prescriptionDelete prescriptionDelete
   */
  deletePrescriptionUsingDELETEResponse(prescriptionDelete: PrescriptionDelete): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = prescriptionDelete;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/prescription`,
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
   * Eliminar registro de prescripción
   * @param prescriptionDelete prescriptionDelete
   */
  deletePrescriptionUsingDELETE(prescriptionDelete: PrescriptionDelete): __Observable<null> {
    return this.deletePrescriptionUsingDELETEResponse(prescriptionDelete).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Actualizar registro de prescripción
   * @param prescriptionUpdate prescriptionUpdate
   * @return OK
   */
  updatePrescriptionUsingPATCHResponse(prescriptionUpdate: PrescriptionUpdate): __Observable<__StrictHttpResponse<PrescriptionUpdate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = prescriptionUpdate;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/prescription`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PrescriptionUpdate>;
      })
    );
  }
  /**
   * Actualizar registro de prescripción
   * @param prescriptionUpdate prescriptionUpdate
   * @return OK
   */
  updatePrescriptionUsingPATCH(prescriptionUpdate: PrescriptionUpdate): __Observable<PrescriptionUpdate> {
    return this.updatePrescriptionUsingPATCHResponse(prescriptionUpdate).pipe(
      __map(_r => _r.body as PrescriptionUpdate)
    );
  }

  /**
   * Obtener prescripcion por id
   * @param id id
   * @return OK
   */
  getPrescriptionsByidUsingGETResponse(id: number): __Observable<__StrictHttpResponse<PrescriptionToDetail>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/prescription/get-by-id/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PrescriptionToDetail>;
      })
    );
  }
  /**
   * Obtener prescripcion por id
   * @param id id
   * @return OK
   */
  getPrescriptionsByidUsingGET(id: number): __Observable<PrescriptionToDetail> {
    return this.getPrescriptionsByidUsingGETResponse(id).pipe(
      __map(_r => _r.body as PrescriptionToDetail)
    );
  }
}

module PrescriptionService {
}

export { PrescriptionService }
