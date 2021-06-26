/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { NormativaToTable } from '../models/normativa-to-table';
import { NormativaCreateDTO } from '../models/normativa-create-dto';
import { NormativaUpdateDTO } from '../models/normativa-update-dto';
import { NormativaDeleteDTO } from '../models/normativa-delete-dto';
import { Normativa } from '../models/normativa';
import { NormativaGeneric } from '../models/normativa-generic';
import { NormativaDetailDTO } from '../models/normativa-detail-dto';

/**
 * Normativa Controller
 */
@Injectable({
  providedIn: 'root',
})
class NormativaService extends __BaseService {
  static readonly getNormativaUsingGETPath = '/normativa';
  static readonly createNormativaUsingPOSTPath = '/normativa';
  static readonly updateNormativaUsingPUTPath = '/normativa';
  static readonly deleteNormativaUsingDELETEPath = '/normativa';
  static readonly findAllNormativasUsingGETPath = '/normativa/allNormativas';
  static readonly searchUsingGETPath = '/normativa/findAll';
  static readonly getDetailNormativaUsingGETPath = '/normativa/getDetail';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Listar normativas
   * @return OK
   */
  getNormativaUsingGETResponse(): __Observable<__StrictHttpResponse<Array<NormativaToTable>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/normativa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<NormativaToTable>>;
      })
    );
  }
  /**
   * Listar normativas
   * @return OK
   */
  getNormativaUsingGET(): __Observable<Array<NormativaToTable>> {
    return this.getNormativaUsingGETResponse().pipe(
      __map(_r => _r.body as Array<NormativaToTable>)
    );
  }

  /**
   * Crear nuevo registro de normativa
   * @param normativaDTO normativaDTO
   * @return Created
   */
  createNormativaUsingPOSTResponse(normativaDTO: NormativaCreateDTO): __Observable<__StrictHttpResponse<NormativaCreateDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = normativaDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/normativa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NormativaCreateDTO>;
      })
    );
  }
  /**
   * Crear nuevo registro de normativa
   * @param normativaDTO normativaDTO
   * @return Created
   */
  createNormativaUsingPOST(normativaDTO: NormativaCreateDTO): __Observable<NormativaCreateDTO> {
    return this.createNormativaUsingPOSTResponse(normativaDTO).pipe(
      __map(_r => _r.body as NormativaCreateDTO)
    );
  }

  /**
   * Actualizar un registro de normativa
   * @param normativaDTO normativaDTO
   * @return OK
   */
  updateNormativaUsingPUTResponse(normativaDTO: NormativaUpdateDTO): __Observable<__StrictHttpResponse<NormativaUpdateDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = normativaDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/normativa`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NormativaUpdateDTO>;
      })
    );
  }
  /**
   * Actualizar un registro de normativa
   * @param normativaDTO normativaDTO
   * @return OK
   */
  updateNormativaUsingPUT(normativaDTO: NormativaUpdateDTO): __Observable<NormativaUpdateDTO> {
    return this.updateNormativaUsingPUTResponse(normativaDTO).pipe(
      __map(_r => _r.body as NormativaUpdateDTO)
    );
  }

  /**
   * Eliminación logica de una normativa
   * @param normativaDTO normativaDTO
   */
  deleteNormativaUsingDELETEResponse(normativaDTO: NormativaDeleteDTO): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = normativaDTO;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/normativa`,
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
   * Eliminación logica de una normativa
   * @param normativaDTO normativaDTO
   */
  deleteNormativaUsingDELETE(normativaDTO: NormativaDeleteDTO): __Observable<null> {
    return this.deleteNormativaUsingDELETEResponse(normativaDTO).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Buscar todas las normativas
   * @return OK
   */
  findAllNormativasUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Normativa>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/normativa/allNormativas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Normativa>>;
      })
    );
  }
  /**
   * Buscar todas las normativas
   * @return OK
   */
  findAllNormativasUsingGET(): __Observable<Array<Normativa>> {
    return this.findAllNormativasUsingGETResponse().pipe(
      __map(_r => _r.body as Array<Normativa>)
    );
  }

  /**
   * Buscar normativas en estado activo
   * @return OK
   */
  searchUsingGETResponse(): __Observable<__StrictHttpResponse<Array<NormativaGeneric>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/normativa/findAll`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<NormativaGeneric>>;
      })
    );
  }
  /**
   * Buscar normativas en estado activo
   * @return OK
   */
  searchUsingGET(): __Observable<Array<NormativaGeneric>> {
    return this.searchUsingGETResponse().pipe(
      __map(_r => _r.body as Array<NormativaGeneric>)
    );
  }

  /**
   * Detalle de normativa
   * @param id id
   * @return OK
   */
  getDetailNormativaUsingGETResponse(id: number): __Observable<__StrictHttpResponse<NormativaDetailDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set('id', id.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/normativa/getDetail`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NormativaDetailDTO>;
      })
    );
  }
  /**
   * Detalle de normativa
   * @param id id
   * @return OK
   */
  getDetailNormativaUsingGET(id: number): __Observable<NormativaDetailDTO> {
    return this.getDetailNormativaUsingGETResponse(id).pipe(
      __map(_r => _r.body as NormativaDetailDTO)
    );
  }
}

module NormativaService {
}

export { NormativaService }
