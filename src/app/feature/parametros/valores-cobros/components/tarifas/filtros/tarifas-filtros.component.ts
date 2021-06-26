/* -----------------------------------------
AUTOR: Jhonnatan Sanchez
EMPRESA: Asesoftware
REQUERIMIENTO: Sprint_02 - HU_1.6.x
FECHA CREACIÓN: Marzo 29 de 2021
------------------------------------------- */
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { FormControl, FormBuilder } from '@angular/forms';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Department } from '@core/api/models/department';
import { default as _rollupMoment } from 'moment';
import * as _moment from 'moment';
import { ItemMenu } from '@core/api/models';
import { Concepto } from '@core/api/models/concepto';
import { CONCEPTO_TIPOLOGIA_DEBITO } from '@core/utils/Constants';
import { DomainService } from '@core/api/services';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-tarifas-filtros',
  templateUrl: './tarifas-filtros.component.html',
  styleUrls: ['./tarifas-filtros.component.scss']
})
export class TarifasFiltrosComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  @Output() onFilterChange = new EventEmitter;
  @Output() tarifasFiltradas: EventEmitter<any> = new EventEmitter();

  @Input() tarifas: any;
  @Input() lstConceptos: any;
  @Input() lstTiposPlaca: any;
  @Input() lstTiposVehiculo: any;
  @Input() lstTiposCombustible: any;
  @Input() lstNormativas: any;
  @Input() lstPeriodicidad: any;
  @Input() clearFilters: Observable<void>;


  lstDepartamentos: Observable<Department[]>;
  public calcularImpuestoComo$: Observable<ItemMenu[]>;
  public conceptoBase$: Observable<ItemMenu[]>;
  public conceptosDebito$: Observable<Concepto[]>;
  lstValorVehiculo: Observable<any[]>;
  //lstMunicipios: Observable<Municipality[]>;
  lstMunicipios: any[] = [];


  tarifasFilter: any;  

  public form = this.fb.group({
    conceptoFilter:         [''],
    normativaFilter:         [''],

    tipoPlacaFilter:         [''],
    tipoVehiculoFilter:         [''],  
    tipoCombustibleFilter:         [''],  

    fechaInicial:         [''],
    fechaFinal:         [''],

    cilindrajeMinFilter:    [''],
    cilindrajeMaxFilter:    [''],
    anioVehiculoMinFilter:    [''],
    anioVehiculoMaxFilter:    [''],
    anioInscripMinFilter:    [''],
    anioInscripMaxFilter:    [''],
    anioCirculaMinFilter:    [''],
    anioCirculaMaxFilter:    [''],
    aniosCirculaMinFilter:    [''],
    aniosCirculaMaxFilter:    [''],

    departamentoFilter:     [''],
    municipioFilter:     [''],
    estadoFilter:     [''],
    valorFijoMinFilter:     [''],
    valorFijoMaxFilter:     [''],

    porcentajeMinFilter:     [''],
    porcentajeMaxFilter:     [''],
    calcularImpuestoComo:     [''],
    descripcion:     [''],
    conceptoBase:     [''],
    operadorVehiculo:     [''],
    valorVehiculoMinFilter:     [''],
    valorVehiculoMaxFilter:     [''],

  })

  constructor(private fb: FormBuilder,
              private filtrosTablaSvc: FiltrosTablaService,
              private domainSvc: DomainService,
    ) { } 

  get formControls() {
      return this.form.controls;
  }

  ngOnInit(): void {
    this.getValoresSelect();
    this.listener();
    this.subs.add(this.clearFilters.subscribe(() => this.cleanFilters()));
  }

  getValoresSelect(){
    this.lstDepartamentos = this.filtrosTablaSvc.departamentos();
    this.filtrosTablaSvc.municipios().subscribe((data) => {this.lstMunicipios = data});
    this.calcularImpuestoComo$ = this.filtrosTablaSvc.calcularImpuestoComo();
    this.conceptoBase$ = this.filtrosTablaSvc.conceptoBase();
    this.conceptosDebito$ = this.filtrosTablaSvc.conceptoPorTipologia(CONCEPTO_TIPOLOGIA_DEBITO);
    this.filtrosTablaSvc.conceptoPorTipologia(CONCEPTO_TIPOLOGIA_DEBITO)
      .subscribe(data => console.log('concepto tipologia', data));
    this.filtrosTablaSvc.conceptoBase()
      .subscribe(data => console.log('concepto base', data));
    this.lstValorVehiculo = this.domainSvc.getDomainsByIdUsingGET('ROPERADOR');
  }


  filter() {
    this.tarifasFilter = [];
    this.tarifasFilter= this.tarifas.filter(x => {
    
      let match = true;
      if (x?.registral) {
        match = this.filtroRegistrales(match, x);
      } else {
        if(this.formControls.conceptoFilter.value && this.formControls.conceptoFilter.value != ''){
          match = match && (x?.idParConcepto?.nombre.toString().trim().toLowerCase() == 
            this.formControls?.conceptoFilter?.value.toString().trim().toLowerCase())}
  
        if(this.formControls.normativaFilter.value && this.formControls.normativaFilter.value != ''){
          match = match && (x?.idParConcepto?.normativa?.nombre?.toString().trim().toLowerCase() == 
            this.formControls?.normativaFilter?.value?.toString().trim().toLowerCase())}
          
        if(this.formControls.fechaInicial.value){
          match = match && (x?.fechaInicial >= this.formControls.fechaInicial.value.format('YYYY-MM-DD'));}
  
        if(this.formControls.fechaFinal.value){
          match = match && (x?.fechaFinal <= this.formControls.fechaFinal.value.format('YYYY-MM-DD'));}
  
        // Filtro descripcion
        if(this.formControls.descripcion.value){
          match = match && (x?.descripcion?.toLowerCase().includes(
            this.formControls.descripcion.value.toLowerCase()));}
  
        //Filtros parametros cilindraje
        let paramCilindraje = this.buscarParametro(x, 'CILINDRAJE');
        if(this.formControls.cilindrajeMinFilter.value){
          if(paramCilindraje){
            match = match && (paramCilindraje.valorMin >= this.formControls.cilindrajeMinFilter.value);
          }else { match = false }     
        }  
        if(this.formControls.cilindrajeMaxFilter.value){
            if(paramCilindraje && paramCilindraje.valorMax){
              match = match && (paramCilindraje.valorMax <= this.formControls.cilindrajeMaxFilter.value);
            }else { match = false }
        }
  
        //Filtros parametros annio vehiculo
        let paramAnnioVehiculo = this.buscarParametro(x, 'ANNIO_VEHICULO');
        if(this.formControls.anioVehiculoMinFilter.value){
            if(paramAnnioVehiculo){
              match = match && (paramAnnioVehiculo.valorMin >= this.formControls.anioVehiculoMinFilter.value);
            }else { match = false }
        }  
        if(this.formControls.anioVehiculoMaxFilter.value){
            if(paramAnnioVehiculo && paramAnnioVehiculo.valorMax){
              match = match && (paramAnnioVehiculo.valorMax <= this.formControls.anioVehiculoMaxFilter.value);
            }else { match = false }
        }
  
        //Filtros parametros annio inscripcion
        let paramAnnioInscripcion = this.buscarParametro(x, 'ANNIO_INSCRIPCION');
        if(this.formControls.anioInscripMinFilter.value){
            if(paramAnnioInscripcion){
              match = match && (paramAnnioInscripcion.valorMin >= this.formControls.anioInscripMinFilter.value);
            }else { match = false }
        }  
        if(this.formControls.anioInscripMaxFilter.value){
            if(paramAnnioInscripcion && paramAnnioInscripcion.valorMax){
              match = match && (paramAnnioInscripcion.valorMax <= this.formControls.anioInscripMaxFilter.value);
            }else { match = false }
        }
  
        //Filtros parametros annio circulacion
        let paramAnnioCirculacion = this.buscarParametro(x, 'ANNIO_CIRCULACION');
        if(this.formControls.anioCirculaMinFilter.value){
            if(paramAnnioCirculacion){
              match = match && (paramAnnioCirculacion.valorMin >= this.formControls.anioCirculaMinFilter.value);
            }else { match = false }
        }  
        if(this.formControls.anioCirculaMaxFilter.value){
            if(paramAnnioCirculacion && paramAnnioCirculacion.valorMax){
              match = match && (paramAnnioCirculacion.valorMax <= this.formControls.anioCirculaMaxFilter.value);
            }else { match = false }
        }
  
        //Filtros parametros annios circulacion
        let paramAnniosCirculacion = this.buscarParametro(x, 'ANNIOS_CIRCULACION');
        if(this.formControls.aniosCirculaMinFilter.value){
            if(paramAnniosCirculacion){
              match = match && (paramAnniosCirculacion.valorMin >= this.formControls.aniosCirculaMinFilter.value);
            }else { match = false }
        }  
        if(this.formControls.aniosCirculaMaxFilter.value){
            if(paramAnniosCirculacion && paramAnniosCirculacion.valorMax){
              match = match && (paramAnniosCirculacion.valorMax <= this.formControls.aniosCirculaMaxFilter.value);
            }else { match = false }
        }
        
        //Filtros parametros tipo placa
        let paramTipoPlaca = this.buscarParametro(x, 'CLASE_PLACA');
        if(this.formControls.tipoPlacaFilter.value && this.formControls.tipoPlacaFilter.value != ''){
          if(paramTipoPlaca){
            match = match && (paramTipoPlaca?.valorMin  == this.formControls.tipoPlacaFilter.value);
          }else { match = false } 
        } 
  
        //Filtros parametros tipo vehículo
        let paramTipoVehiculo = this.buscarParametro(x, 'TIPO_VEHICULO');
        if(this.formControls.tipoVehiculoFilter.value && this.formControls.tipoVehiculoFilter.value != ''){
          if(paramTipoVehiculo){
            match = match && (paramTipoVehiculo?.valorMin == this.formControls.tipoVehiculoFilter.value);
          }else { match = false } 
        } 
  
        //Filtros parametros tipo combustible
        let paramTipoCombust = this.buscarParametro(x, 'TIPO_COMBUSTIBLE');
        if(this.formControls.tipoCombustibleFilter.value && this.formControls.tipoCombustibleFilter.value != ''){
          if(paramTipoCombust){
            match = match && (paramTipoCombust?.valorMin == this.formControls.tipoCombustibleFilter.value);
          }else { match = false } 
        } 
  
        //Filtros departamento y my municipios
        let paramDepartamento = this.buscarDepartamento(x, this.formControls.departamentoFilter.value);
        if(this.formControls.departamentoFilter.value && this.formControls.departamentoFilter.value != ''){
          if(paramDepartamento) {
            match = match && (paramDepartamento.tnTarifasMunicipiosPK.idDepartamento == this.formControls.departamentoFilter.value);          
          }else { match = false }
        }
  
        if(this.formControls.municipioFilter.value && this.formControls.municipioFilter.value != ''){
          let paramMunicipio = this.buscarMunicipio(x, this.formControls.municipioFilter.value);
          if(paramMunicipio) {
            match = match && (paramMunicipio.tnTarifasMunicipiosPK.idMunicipio == this.formControls.municipioFilter.value.municipio);
          }else { match = false }
        }

        // Filtro calcular impuesto como
        if(this.formControls.calcularImpuestoComo.value && this.formControls.calcularImpuestoComo.value != ''){
          match = match && (x?.calcularImpuestoComo == this.formControls?.calcularImpuestoComo?.value)}

        // Filtro de rango de valor fijo o minimo
        if(this.formControls.valorFijoMinFilter.value || this.formControls.valorFijoMinFilter.value === 0){
          match = match && (x?.valorFijo >= this.formControls.valorFijoMinFilter.value 
            || x?.montoMinimo >= this.formControls.valorFijoMinFilter.value);}
    
        if(this.formControls.valorFijoMaxFilter.value || this.formControls.valorFijoMaxFilter.value === 0){
          match = match && (x?.valorFijo <= this.formControls.valorFijoMaxFilter.value);}

        // Filtro de rango de porcentaje
        if(this.formControls.porcentajeMinFilter.value || this.formControls.porcentajeMinFilter.value === 0){
          match = match && (x?.valorPorcentaje >= this.formControls.porcentajeMinFilter.value)}
    
        if(this.formControls.porcentajeMaxFilter.value || this.formControls.porcentajeMaxFilter.value === 0){
          match = match && (x?.valorPorcentaje <= this.formControls.porcentajeMaxFilter.value);}
          
        // Filtro de concepto base 
        if(this.formControls.conceptoBase.value && this.formControls.conceptoBase.value != ''){
          match = match && (x?.refenciaPorcentaje == this.formControls?.conceptoBase?.value)}
          
        // Filtro de valor vehiculo
        if(this.formControls.operadorVehiculo.value && this.formControls.operadorVehiculo.value != ''){
          match = match && (x?.operValVehiculo == this.formControls?.operadorVehiculo?.value)}

        // Filtro de rango de valor vehiculo
        if(this.formControls.valorVehiculoMinFilter.value || this.formControls.valorVehiculoMinFilter.value === 0){
          if(x?.valMinVehiculo){
            match = match && (x?.valMinVehiculo >= this.formControls.valorVehiculoMinFilter.value);
          }else { match = false }
        }  
        if(this.formControls.valorVehiculoMaxFilter.value || this.formControls.valorVehiculoMaxFilter.value === 0){
          if(x?.valMinVehiculo && x?.valMaxVehiculo){
            match = match && (x?.valMaxVehiculo <= this.formControls.valorVehiculoMaxFilter.value);
          }else { match = false }
        }
        // Filtro estado
        if(this.formControls.estadoFilter.value){
          match = match && (x?.estado === this.formControls.estadoFilter.value);}
      }
      return match;
    });
    this.tarifasFiltradas.emit(this.tarifasFilter);
  }

  filtroRegistrales(match: boolean, item: any): boolean {
    // Filtro descripcion
    if(this.formControls.descripcion.value){
      match = match && (item?.descripcion?.toLowerCase().includes(
        this.formControls.descripcion.value.toLowerCase()));}

    if (this.formControls?.tipoPlacaFilter?.value) {
      match = match && (item.clasePlaca?.toString().trim().toLowerCase()
        === this.formControls?.tipoPlacaFilter?.value?.toString().trim().toLowerCase()
        || item.clasePlaca?.toString().trim().toLowerCase() === 'todas');
    }
    if (this.formControls?.tipoVehiculoFilter?.value) {
      match = match && (item.tipoVehiculo?.toString().trim().toLowerCase()
        === this.formControls?.tipoVehiculoFilter?.value.toString().trim().toLowerCase()
        || item.tipoVehiculo?.toString().trim().toLowerCase() === 'todas');
    }
    if (this.formControls?.conceptoFilter?.value) {
      match = match && (item.conceptoDebito?.toString().trim().toLowerCase()
        === this.formControls?.conceptoFilter?.value.toString().trim().toLowerCase());
    }
    if(this.formControls.fechaInicial.value){
      match = match && (moment(item?.fechaInicial, 'YYYY-MM-DD') >= this.formControls.fechaInicial.value);}

    if(this.formControls.fechaFinal.value){
      match = match && (moment(item?.fechaFinal, 'YYYY-MM-DD') <= this.formControls.fechaFinal.value);}

    if(this.formControls.cilindrajeMinFilter.value){
      match = false;}  
    if(this.formControls.cilindrajeMaxFilter.value){
      match = false;}
    if(this.formControls.anioVehiculoMinFilter.value){
      match = false;}  
    if(this.formControls.anioVehiculoMaxFilter.value){
      match = false;}
    if(this.formControls.anioInscripMinFilter.value){
      match = false;}  
    if(this.formControls.anioInscripMaxFilter.value){
      match = false;}
    if(this.formControls.anioCirculaMinFilter.value){
      match = false;}  
    if(this.formControls.anioCirculaMaxFilter.value){
      match = false;}
    if(this.formControls.aniosCirculaMinFilter.value){
      match = false;}  
    if(this.formControls.aniosCirculaMaxFilter.value){
      match = false;}
    if(this.formControls.tipoCombustibleFilter.value && this.formControls.tipoCombustibleFilter.value != ''){
      match = false;} 
    if(this.formControls.departamentoFilter.value && this.formControls.departamentoFilter.value != ''){
      match = false;}
    if(this.formControls.municipioFilter.value && this.formControls.municipioFilter.value != ''){
      match = false;}
    if(this.formControls.calcularImpuestoComo.value && this.formControls.calcularImpuestoComo.value != ''){
      match = false}
    if(this.formControls.porcentajeMinFilter.value || this.formControls.porcentajeMinFilter.value === 0){
      match = false}
    if(this.formControls.porcentajeMaxFilter.value || this.formControls.porcentajeMaxFilter.value === 0){
      match = false}
    if(this.formControls.conceptoBase.value && this.formControls.conceptoBase.value != ''){
      match = false}
    if(this.formControls.operadorVehiculo.value && this.formControls.operadorVehiculo.value != ''){
      match = false}
    if(this.formControls.valorVehiculoMinFilter.value || this.formControls.valorVehiculoMinFilter.value === 0){
      match = false}
    if(this.formControls.valorVehiculoMaxFilter.value || this.formControls.valorVehiculoMaxFilter.value === 0){
      match = false}

    if(this.formControls.estadoFilter.value){
      match = match && (item?.estado === this.formControls.estadoFilter.value);}

    if(this.formControls.valorFijoMinFilter.value || this.formControls.valorFijoMinFilter.value === 0){
      match = match && (item?.valorFijo >= this.formControls.valorFijoMinFilter.value);}

    if(this.formControls.valorFijoMaxFilter.value || this.formControls.valorFijoMaxFilter.value === 0){
      match = match && (item?.valorFijo <= this.formControls.valorFijoMaxFilter.value);}
    return match;
  }

  buscarParametro(x, parametro: string) : any{
    if (x?.idCondTarifa) {
      return x?.idCondTarifa?.parametrosList?.find(param => {
        if(param?.nombre == parametro ){
          return param;
        }      
      });
    }
    return null;
  }

  buscarDepartamento(x, parametro: string) : any{
    return x?.municipiosList?.find(param => {
    if(param?.tnTarifasMunicipiosPK?.idDepartamento == parametro ){
      return param;
    }      
    });
  }

  buscarMunicipio(x, municipio: any) : any{
    return x?.municipiosList?.find(param => {
    if(param?.tnTarifasMunicipiosPK?.idMunicipio == municipio.municipio && 
      param?.tnTarifasMunicipiosPK?.idDepartamento == municipio.departamento){
      return param;
    }      
  });
  }

  clearDate(formControlName: FormControl): void {
    if (formControlName.value !== "") {
      formControlName.reset();
    }
  }
  

  listener(){
    this.formControls.fechaInicial.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.fechaFinal.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.cilindrajeMinFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.cilindrajeMaxFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.anioVehiculoMinFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.anioVehiculoMaxFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.anioInscripMinFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.anioInscripMaxFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.anioCirculaMinFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.anioCirculaMaxFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.aniosCirculaMinFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.aniosCirculaMaxFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.valorFijoMinFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.valorFijoMaxFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.porcentajeMinFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.porcentajeMaxFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.valorVehiculoMinFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.valorVehiculoMaxFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.descripcion.valueChanges.subscribe(()=>{this.filter();});
  }

  cleanFilters() {
    this.form.reset();
    this.tarifasFiltradas.emit(this.tarifas);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
  
}