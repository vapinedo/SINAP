/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConceptoCreate } from '../models/concepto-create';
import { ConceptoUpdate } from '../models/concepto-update';
import { Concepto } from '../models/concepto';
import { ConceptoCuentaCorriente } from '../models/concepto-cuenta-corriente';
import { ItemMenu } from '../models/item-menu';
import { ConceptoItem } from '../models/concepto-item';
import { ConceptoMultas } from '../models/concepto-multas';

/**
 * Concepto Controller
 */
@Injectable({
  providedIn: 'root',
})
class ConceptoService extends __BaseService {
  static readonly saveUsingPOSTPath = '/concepto';
  static readonly updateUsingPUTPath = '/concepto';
  static readonly deleteUsingDELETEPath = '/concepto';
  static readonly findAllConceptosDebitoUsingGETPath = '/concepto/allDebitos';
  static readonly getConceptosCuentaCorrienteUsingGETPath = '/concepto/conceptosCuentaCorriente';
  static readonly getActiveConceptsCreditUsingGETPath = '/concepto/creditos';
  static readonly getCreditsEntityConceptUsingGETPath = '/concepto/creditosEntidad';
  static readonly getActiveConceptsDebitUsingGETPath = '/concepto/debitos';
  static readonly getDebitsEntityConceptUsingGETPath = '/concepto/debitosEntidad';
  static readonly getConceptosDebitRegistralUsingGETPath = '/concepto/debitosRegistrales';
  static readonly getActiveConceptsDebitRegistralCurrentUsingGETPath = '/concepto/debitosRegistralesVigentes';
  static readonly getActiveConceptsDebitCurrentUsingGETPath = '/concepto/debitosVigentes';
  static readonly getAllConceptsUsingGETPath = '/concepto/findAll';
  static readonly getConceptByIdUsingGETPath = '/concepto/findById';
  static readonly getAllConceptsByTipologyUsingGETPath = '/concepto/findByTypologia';
  static readonly getConceptByKeyUniqueUsingGETPath = '/concepto/findByValoresUnicos';
  static readonly getAllConceptoDebActiVigMultaUsingGETPath = '/concepto/getAllConceptoDebNormativaActVigente';
  static readonly getConceptoDebNormativaActVigenteUsingGETPath = '/concepto/getConceptoDebNormativaActVigente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Guardar concepto a cobrar
   * @param conceptDTO conceptDTO
   */
  saveUsingPOSTResponse(conceptDTO: ConceptoCreate): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = conceptDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/concepto`,
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
   * Guardar concepto a cobrar
   * @param conceptDTO conceptDTO
   */
  saveUsingPOST(conceptDTO: ConceptoCreate): __Observable<null> {
    return this.saveUsingPOSTResponse(conceptDTO).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Actualizar concepto a cobrar
   * @param conceptDTO conceptDTO
   */
  updateUsingPUTResponse(conceptDTO: ConceptoUpdate): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = conceptDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/concepto`,
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
   * Actualizar concepto a cobrar
   * @param conceptDTO conceptDTO
   */
  updateUsingPUT(conceptDTO: ConceptoUpdate): __Observable<null> {
    return this.updateUsingPUTResponse(conceptDTO).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Eliminado lógico concepto a cobrar
   * @param params The `ConceptoService.DeleteUsingDELETEParams` containing the following parameters:
   *
   * - `observaciones`: observaciones
   *
   * - `idConcept`: idConcept
   */
  deleteUsingDELETEResponse(params: ConceptoService.DeleteUsingDELETEParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.observaciones != null) __params = __params.set('observaciones', params.observaciones.toString());
    if (params.idConcept != null) __params = __params.set('idConcept', params.idConcept.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/concepto`,
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
   * Eliminado lógico concepto a cobrar
   * @param params The `ConceptoService.DeleteUsingDELETEParams` containing the following parameters:
   *
   * - `observaciones`: observaciones
   *
   * - `idConcept`: idConcept
   */
  deleteUsingDELETE(params: ConceptoService.DeleteUsingDELETEParams): __Observable<null> {
    return this.deleteUsingDELETEResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Obtener todos los conceptos debito
   * @return OK
   */
  findAllConceptosDebitoUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Concepto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/allDebitos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Concepto>>;
      })
    );
  }
  /**
   * Obtener todos los conceptos debito
   * @return OK
   */
  findAllConceptosDebitoUsingGET(): __Observable<Array<Concepto>> {
    return this.findAllConceptosDebitoUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Concepto>)
    );
  }

  /**
   * Obtener conceptos debito para cuentas corriente
   * @return OK
   */
  getConceptosCuentaCorrienteUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ConceptoCuentaCorriente>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/conceptosCuentaCorriente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConceptoCuentaCorriente>>;
      })
    );
  }
  /**
   * Obtener conceptos debito para cuentas corriente
   * @return OK
   */
  getConceptosCuentaCorrienteUsingGET(): __Observable<Array<ConceptoCuentaCorriente>> {
    return this.getConceptosCuentaCorrienteUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ConceptoCuentaCorriente>)
    );
  }

  /**
   * Obtener conceptos credito a cobrar en estado Activo
   * @return OK
   */
  getActiveConceptsCreditUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ItemMenu>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/creditos`,
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
   * Obtener conceptos credito a cobrar en estado Activo
   * @return OK
   */
  getActiveConceptsCreditUsingGET(): __Observable<Array<ItemMenu>> {
    return this.getActiveConceptsCreditUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ItemMenu>)
    );
  }

  /**
   * Obtener conceptos entidad debito a cobrar en estado Activo
   * @return OK
   */
  getCreditsEntityConceptUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Concepto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/creditosEntidad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Concepto>>;
      })
    );
  }
  /**
   * Obtener conceptos entidad debito a cobrar en estado Activo
   * @return OK
   */
  getCreditsEntityConceptUsingGET(): __Observable<Array<Concepto>> {
    return this.getCreditsEntityConceptUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Concepto>)
    );
  }

  /**
   * Obtener conceptos debito a cobrar en estado Activo
   * @return OK
   */
  getActiveConceptsDebitUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ItemMenu>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/debitos`,
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
   * Obtener conceptos debito a cobrar en estado Activo
   * @return OK
   */
  getActiveConceptsDebitUsingGET(): __Observable<Array<ItemMenu>> {
    return this.getActiveConceptsDebitUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ItemMenu>)
    );
  }

  /**
   * Obtener conceptos entidad debito a cobrar en estado Activo
   * @return OK
   */
  getDebitsEntityConceptUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Concepto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/debitosEntidad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Concepto>>;
      })
    );
  }
  /**
   * Obtener conceptos entidad debito a cobrar en estado Activo
   * @return OK
   */
  getDebitsEntityConceptUsingGET(): __Observable<Array<Concepto>> {
    return this.getDebitsEntityConceptUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Concepto>)
    );
  }

  /**
   * Obtener conceptos debito registrales a cobrar
   * @return OK
   */
  getConceptosDebitRegistralUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ConceptoItem>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/debitosRegistrales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConceptoItem>>;
      })
    );
  }
  /**
   * Obtener conceptos debito registrales a cobrar
   * @return OK
   */
  getConceptosDebitRegistralUsingGET(): __Observable<Array<ConceptoItem>> {
    return this.getConceptosDebitRegistralUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ConceptoItem>)
    );
  }

  /**
   * Obtener conceptos debito a cobrar en estado Activo y con fecha vigente
   * @return OK
   */
  getActiveConceptsDebitRegistralCurrentUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ItemMenu>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/debitosRegistralesVigentes`,
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
   * Obtener conceptos debito a cobrar en estado Activo y con fecha vigente
   * @return OK
   */
  getActiveConceptsDebitRegistralCurrentUsingGET(): __Observable<Array<ItemMenu>> {
    return this.getActiveConceptsDebitRegistralCurrentUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ItemMenu>)
    );
  }

  /**
   * Obtener conceptos debito a cobrar en estado Activo y con fecha vigente
   * @return OK
   */
  getActiveConceptsDebitCurrentUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ItemMenu>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/debitosVigentes`,
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
   * Obtener conceptos debito a cobrar en estado Activo y con fecha vigente
   * @return OK
   */
  getActiveConceptsDebitCurrentUsingGET(): __Observable<Array<ItemMenu>> {
    return this.getActiveConceptsDebitCurrentUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ItemMenu>)
    );
  }

  /**
   * Buscar conceptos que no esten eliminados
   * @return OK
   */
  getAllConceptsUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Concepto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/findAll`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Concepto>>;
      })
    );
  }
  /**
   * Buscar conceptos que no esten eliminados
   * @return OK
   */
  getAllConceptsUsingGET(): __Observable<Array<Concepto>> {
    return this.getAllConceptsUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Concepto>)
    );
  }

  /**
   * Buscar conceptos que no esten eliminados
   * @param idConcept idConcept
   * @return OK
   */
  getConceptByIdUsingGETResponse(idConcept: number): __Observable<__StrictHttpResponse<Concepto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConcept != null) __params = __params.set('idConcept', idConcept.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/findById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Concepto>;
      })
    );
  }
  /**
   * Buscar conceptos que no esten eliminados
   * @param idConcept idConcept
   * @return OK
   */
  getConceptByIdUsingGET(idConcept: number): __Observable<Concepto> {
    return this.getConceptByIdUsingGETResponse(idConcept).pipe(
      __map(_r => _r.body as Concepto)
    );
  }

  /**
   * Buscar conceptos por tipología que no esten eliminados
   * @param typoloy typoloy
   * @return OK
   */
  getAllConceptsByTipologyUsingGETResponse(typoloy: string): __Observable<__StrictHttpResponse<Array<Concepto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (typoloy != null) __params = __params.set('typoloy', typoloy.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/findByTypologia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Concepto>>;
      })
    );
  }
  /**
   * Buscar conceptos por tipología que no esten eliminados
   * @param typoloy typoloy
   * @return OK
   */
  getAllConceptsByTipologyUsingGET(typoloy: string): __Observable<Array<Concepto>> {
    return this.getAllConceptsByTipologyUsingGETResponse(typoloy).pipe(
      __map(_r => _r.body as Array<Concepto>)
    );
  }

  /**
   * Buscar conceptos que no esten eliminados
   * @param params The `ConceptoService.GetConceptByKeyUniqueUsingGETParams` containing the following parameters:
   *
   * - `typology`: typology
   *
   * - `code`: code
   *
   * - `idNormative`: idNormative
   *
   * @return OK
   */
  getConceptByKeyUniqueUsingGETResponse(params: ConceptoService.GetConceptByKeyUniqueUsingGETParams): __Observable<__StrictHttpResponse<Array<Concepto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.typology != null) __params = __params.set('typology', params.typology.toString());
    if (params.code != null) __params = __params.set('code', params.code.toString());
    if (params.idNormative != null) __params = __params.set('idNormative', params.idNormative.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/findByValoresUnicos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Concepto>>;
      })
    );
  }
  /**
   * Buscar conceptos que no esten eliminados
   * @param params The `ConceptoService.GetConceptByKeyUniqueUsingGETParams` containing the following parameters:
   *
   * - `typology`: typology
   *
   * - `code`: code
   *
   * - `idNormative`: idNormative
   *
   * @return OK
   */
  getConceptByKeyUniqueUsingGET(params: ConceptoService.GetConceptByKeyUniqueUsingGETParams): __Observable<Array<Concepto>> {
    return this.getConceptByKeyUniqueUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Concepto>)
    );
  }

  /**
   * Obtener TODOS los conceptos debito ACTIVOS y vigentes con CobroMulta
   * @return OK
   */
  getAllConceptoDebActiVigMultaUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Concepto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/getAllConceptoDebNormativaActVigente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Concepto>>;
      })
    );
  }
  /**
   * Obtener TODOS los conceptos debito ACTIVOS y vigentes con CobroMulta
   * @return OK
   */
  getAllConceptoDebActiVigMultaUsingGET(): __Observable<Array<Concepto>> {
    return this.getAllConceptoDebActiVigMultaUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Concepto>)
    );
  }

  /**
   * Obtener conceptos debito activos y vigentes con normativas activas y vigentes
   * @return OK
   */
  getConceptoDebNormativaActVigenteUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ConceptoMultas>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/concepto/getConceptoDebNormativaActVigente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConceptoMultas>>;
      })
    );
  }
  /**
   * Obtener conceptos debito activos y vigentes con normativas activas y vigentes
   * @return OK
   */
  getConceptoDebNormativaActVigenteUsingGET(): __Observable<Array<ConceptoMultas>> {
    return this.getConceptoDebNormativaActVigenteUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ConceptoMultas>)
    );
  }
}

module ConceptoService {

  /**
   * Parameters for deleteUsingDELETE
   */
  export interface DeleteUsingDELETEParams {

    /**
     * observaciones
     */
    observaciones: string;

    /**
     * idConcept
     */
    idConcept: number;
  }

  /**
   * Parameters for getConceptByKeyUniqueUsingGET
   */
  export interface GetConceptByKeyUniqueUsingGETParams {

    /**
     * typology
     */
    typology: string;

    /**
     * code
     */
    code: string;

    /**
     * idNormative
     */
    idNormative?: number;
  }
}

export { ConceptoService }
