import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Concepto, Department, ItemMenu, Municipality, NormativaToTable, PlateClassDTO, VariablesRecaudo } from '@core/api/models';
import { ConceptoService, DomainService, LocationService, NormativaService, PlateClassService, VariablesRecaudoService, VehicleTypeService } from '@core/api/services';

export interface OptionSelect { id: number, label: string }

@Injectable()
export class FiltrosTablaService {

  constructor(
      private domainSvc: DomainService,
      private locationSvc: LocationService,
      private conceptoSvc: ConceptoService,
      private normativaSvc: NormativaService,
      private tipoPlacaSvc: PlateClassService,
      private tipoVehiculoSvc: VehicleTypeService,
      private variablesRecaudoSvc: VariablesRecaudoService
  ) { }

  conceptoDebito(): Observable<Concepto[]> {
    return this.conceptoSvc.getAllConceptsUsingGET();
  }

  departamentos(): Observable<Department[]> {
    return this.locationSvc.getDepartmentsLocationUsingGET();
  }

  municipiosPorDepartamentos(idDepartamentos: number[]): Observable<Municipality[]> {
    return this.locationSvc.getMunicipalitiesDepartmentsLocationUsingGET(idDepartamentos);
  }

  municipios(): Observable<Municipality[]> {
    return this.locationSvc.getMunicipalitiesLocationUsingGET();
  }

  normativas(): Observable<NormativaToTable[]> {
    return this.normativaSvc.getNormativaUsingGET();
  }

  cilindraje(): Observable<ItemMenu[]> {
    const parametro = 'RANGO';
    return this.domainSvc.getDomainsByIdUsingGET(parametro);
  }

  rangoEntre(): Observable<ItemMenu[]> {
    return this.domainSvc.getDomainsByIdUsingGET('RANGO');
  }

  rangoPeriodo(): Observable<ItemMenu[]> {
    return this.domainSvc.getDomainsByIdUsingGET('RTIEMP');
  }

  conceptoBase(): Observable<ItemMenu[]> {
    return this.domainSvc.getDomainsByIdUsingGET('C_BASE');
  } 

  conceptoPorTipologia(tipologia: string): Observable<Concepto[]> {
    return this.conceptoSvc.getAllConceptsByTipologyUsingGET(tipologia);
  } 

  conceptosDebitoAct(): Observable<Concepto[]> {
    return this.conceptoSvc.getDebitsEntityConceptUsingGET();
  } 

  conceptosDebitoActVigentes(): Observable<ItemMenu[]> {
    return this.conceptoSvc.getActiveConceptsDebitCurrentUsingGET();
  } 

  conceptosDebitoRegistralActVigentes(): Observable<ItemMenu[]> {
    return this.conceptoSvc.getActiveConceptsDebitRegistralCurrentUsingGET();
  }

  conceptosDebitoActVigentesMulta(): Observable<Concepto[]> {
    return this.conceptoSvc.getAllConceptoDebActiVigMultaUsingGET();
  } 


  rangoDeTiempo(): Observable<ItemMenu[]> {
    const parametro = 'RTIEMP';
    return this.domainSvc.getDomainsByIdUsingGET(parametro);
  }

  calcularImpuestoComo(): Observable<ItemMenu[]> {
    const parametro = 'C_IMPU';
    return this.domainSvc.getDomainsByIdUsingGET(parametro);
  }

  aniosCirculacion(): Observable<ItemMenu[]> {
    const parametro = 'RTIEMP';
    return this.domainSvc.getDomainsByIdUsingGET(parametro);
  }

  anioInscripcion(): Observable<ItemMenu[]> {
    const parametro = 'RACILIN';
    return this.domainSvc.getDomainsByIdUsingGET(parametro);
  }

  tipoCombustible(): Observable<ItemMenu[]> {
    const parametro = 'TPCOMBUS';
    return this.domainSvc.getDomainsByIdUsingGET(parametro);
  }

  tipoPlaca(): Observable<PlateClassDTO[]> {
    return this.tipoPlacaSvc.getPlateClassUsingGET();
  }

  tipoVehiculo(): Observable<ItemMenu[]> {
    return this.tipoVehiculoSvc.getVehicleTypeUsingGET();
  }

  variablesRecaudo(): Observable<VariablesRecaudo[]> {
    return this.variablesRecaudoSvc.findAllVariablesRecaudoUsingGET();
  }

  conceptoCobro(): object {
    const filtro = {
        nombre: 'Concepto de Cobro',
        opciones: [
            { valor: 'inscripcion tardia', etiqueta: 'Inscripción tardía' },
            { valor: 'tasa unica anual', etiqueta: 'Tasa única anual' },
            { valor: 'tasa vial municipal', etiqueta: 'Tasa vial municipal' }
        ]
    }
    return filtro;
  }

  cobroMulta(): object {
    const filtro = {
        nombre: 'Multa',
        opciones: [
            { valor: '1', etiqueta: 'Si' },
            { valor: '0', etiqueta: 'No' }
        ]
    }
    return filtro;
  }

  periodicidad(): Observable<ItemMenu[]> {
    return this.domainSvc.getDomainsByIdUsingGET('PERIOR');
  }

  cuotas(): object {
    const filtro = {
        nombre: 'Cuotas',
        opciones: [
            { valor: '1', etiqueta: '1' },
            { valor: '2', etiqueta: '2' },
            { valor: '3', etiqueta: '3' },
            { valor: '4', etiqueta: '4' },
            { valor: '5', etiqueta: '5' },
            { valor: '6', etiqueta: '6' },
            { valor: '7', etiqueta: '7' },
            { valor: '8', etiqueta: '8' },
            { valor: '9', etiqueta: '9' },
            { valor: '10', etiqueta: '10' }, 
            { valor: '11', etiqueta: '11' }
        ]
    }
    return filtro;
  }

  modoCobro(): Observable<ItemMenu[]> {
    return this.domainSvc.getDomainsByIdUsingGET('C_IMPU');
  }

}