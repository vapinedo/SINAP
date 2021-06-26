import { TarifasService } from '@core/api/services/tarifas.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';

import { SubSink } from 'subsink';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Department, Municipality } from '@core/api/models';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { ConceptoService, NormativaService } from '@core/api/services';

@Component({
  selector: 'app-filtro-tabla-multa',
  templateUrl: './filtro-tabla-multa.component.html',
  styleUrls: ['./filtro-tabla-multa.component.scss']
})
export class FiltroTablaComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  @Output() onFilterChange = new EventEmitter;
  @Output() multasFiltradas: EventEmitter<any> = new EventEmitter();

  @Input() multas: any;

  @Input() lstTiposPlaca: any;
  @Input() lstTiposVehiculo: any;
  @Input() lstTiposCombustible: any;
  @Input() lstPeriodicidad: any;

  index: any;

  lstDepartamentos: Observable<Department[]>;
  //lstMunicipios: Observable<Municipality[]>;
  lstMunicipios: any[] = [];
  lstTarifas: Observable<any[]>;
  lstModosCobro:   Observable<any[]>;
  lstConceptos:   Observable<any[]>;
  lstNormativas:   Observable<any[]>;


  multasFilter: any;  

  public form = this.fb.group({
    conceptoFilter:         [''],
    normativaFilter:         [''],
    tarifaFilter:         [''],
    modoCobroFilter:         [''],

    cuotaMinFilter:         [''],
    multaMaxFilter:         [''],
    periodicidadFilter:         [''],
    numeroPagosFilter:         [''],

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

  })

  constructor(private fb: FormBuilder,
              private filtrosTablaSvc: FiltrosTablaService,
              private tarifasSvc: TarifasService,
              private conceptoSvc: ConceptoService,
              private normativaSvc: NormativaService,
    ) { } 

  get formControls() {
      return this.form.controls;
  }

  ngOnInit(): void {
    //console.log('Multas filtro::', this.multasBackUp);
    this.getValoresSelect();
    this.listener();
  }

  getValoresSelect(){
    this.lstConceptos = this.conceptoSvc.findAllConceptosDebitoUsingGET();
    this.lstNormativas = this.normativaSvc.findAllNormativasUsingGET();
    this.lstTarifas = this.tarifasSvc.findAllActiveInactiveTarifasUsingGET();
    this.lstDepartamentos = this.filtrosTablaSvc.departamentos();
    this.lstModosCobro = this.filtrosTablaSvc.modoCobro();
    this.filtrosTablaSvc.municipios().subscribe((data) => {this.lstMunicipios = data});
    //this.lstMunicipios = this.filtrosTablaSvc.municipios();
    
  }

  onlyNumber(e: any): boolean {
    if (e)
      return ((e.keyCode > 95 && e.keyCode < 106  && e.keyCode != 101)
        || (e.keyCode > 47 && e.keyCode < 58));
  }

  onlyNumberMonto(e: any): boolean {
    if (e)
      return ((e.keyCode > 95 && e.keyCode < 106  && e.keyCode != 101)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8 || e.code == 'Comma' || e.keyCode == 188);
  }

  filter() {
    console.log('Multas::', this.multas);
    this.multasFilter = [];
    this.multasFilter= this.multas.filter(x => {
      this.index = x.detalleMultaList?.length - 1;
    
      let match = true;
      
      if(this.formControls.conceptoFilter.value && this.formControls.conceptoFilter.value != ''){
        match = match && (x.idParConcepto.id == this.formControls.conceptoFilter.value)}

      if(this.formControls.normativaFilter.value && this.formControls.normativaFilter.value != ''){
        match = match && (x.idParConcepto.normativa?.idNormativa == this.formControls.normativaFilter.value)}
      
      if(this.formControls.tarifaFilter.value && this.formControls.tarifaFilter.value != ''){
        match = match && (x.detalleMultaList[this.index]?.tarifa?.id == this.formControls.tarifaFilter.value)}

      if(this.formControls.modoCobroFilter.value && this.formControls.modoCobroFilter.value != ''){
          match = match && (x.detalleMultaList[this.index]?.modoCobro == this.formControls.modoCobroFilter.value)}

      if(this.formControls.cuotaMinFilter.value && this.formControls.cuotaMinFilter.value != ''){
        match = match && (x.detalleMultaList[this.index]?.valorMinimo == this.formControls.cuotaMinFilter.value)}
       
      if(this.formControls.multaMaxFilter.value && this.formControls.multaMaxFilter.value != ''){
        match = match && (x.detalleMultaList[this.index]?.valorMaximo == this.formControls.multaMaxFilter.value)}

      if(this.formControls.periodicidadFilter.value && this.formControls.periodicidadFilter.value != ''){
        match = match && (x.detalleMultaList[this.index]?.periodicidad == this.formControls.periodicidadFilter.value)}

      if(this.formControls.numeroPagosFilter.value && this.formControls.numeroPagosFilter.value != ''){
        match = match && (x.detalleMultaList[this.index]?.numeroCuotas == this.formControls.numeroPagosFilter.value)}

      if(this.formControls.estadoFilter.value && this.formControls.estadoFilter.value != ''){
        match = match && (x.estado == this.formControls.estadoFilter.value)}
        
      if(this.formControls.fechaInicial.value){
        match = match && (x.detalleMultaList[this.index]?.fechaInicioVigencia >= this.formControls.fechaInicial.value.format('YYYY-MM-DD'))}

      if(this.formControls.fechaFinal.value){
        match = match && (x.detalleMultaList[this.index]?.fechaFinVigencia <= this.formControls.fechaFinal.value.format('YYYY-MM-DD'))}

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
      console.log('param',paramTipoPlaca);
      console.log('param form', this.formControls.tipoPlacaFilter.value);
      if(this.formControls.tipoPlacaFilter.value && this.formControls.tipoPlacaFilter.value != ''){
        if(paramTipoPlaca){
          match = match && (paramTipoPlaca.valorMin == this.formControls.tipoPlacaFilter.value)
        }else { match = false } 
      } 

      //Filtros parametros tipo vehículo
      let paramTipoVehiculo = this.buscarParametro(x, 'TIPO_VEHICULO');
      if(this.formControls.tipoVehiculoFilter.value && this.formControls.tipoVehiculoFilter.value != ''){
        if(paramTipoVehiculo){
          match = match && (paramTipoVehiculo.valorMin == this.formControls.tipoVehiculoFilter.value)
        }else { match = false } 
      } 

      //Filtros parametros tipo combustible
      let paramTipoCombust = this.buscarParametro(x, 'TIPO_COMBUSTIBLE');
      if(this.formControls.tipoCombustibleFilter.value && this.formControls.tipoCombustibleFilter.value != ''){
        if(paramTipoCombust){
          match = match && (paramTipoCombust.valorMin == this.formControls.tipoCombustibleFilter.value)
        }else { match = false } 
      } 

      //Filtros departamento y my municipios
      let paramDepartamento = this.buscarDepartamento(x, this.formControls.departamentoFilter.value);
      if(this.formControls.departamentoFilter.value && this.formControls.departamentoFilter.value != ''){
        if(paramDepartamento) {
          match = match && (paramDepartamento.tnParMultaMunicipioPK.departamento == this.formControls.departamentoFilter.value)          
        }else { match = false }
      }

      if(this.formControls.municipioFilter.value && this.formControls.municipioFilter.value != ''){
        let paramMunicipio = this.buscarMunicipio(x, this.formControls.municipioFilter.value);
        if(paramMunicipio) {
          match = match && (paramMunicipio.tnParMultaMunicipioPK.municipio == this.formControls.municipioFilter.value.municipio)
        }else { match = false }
      }
      return match;

    });
    console.log('MultasDespues::', this.multasFilter);
    this.multasFiltradas.emit(this.multasFilter);
  }

  buscarParametro(x, parametro: string) : any{
      return x.condicionTarifaList[0]?.parametrosList.find(param => {
      if(param.nombre == parametro ){
        return param;
      }      
    });
  }

  buscarDepartamento(x, parametro: string) : any{
    return x.detalleMultaList[this.index]?.multaMunicipioList.find(param => {
    if(param.tnParMultaMunicipioPK.departamento == parametro ){
      return param;
    }      
    });
  }

  buscarMunicipio(x, municipio: any) : any{
    return x.detalleMultaList[this.index]?.multaMunicipioList.find(param => {
    if(param.tnParMultaMunicipioPK.municipio == municipio.municipio && 
      param.tnParMultaMunicipioPK.departamento == municipio.departamento){
      return param;
    }      
  });
  }

  buscarDeptoPorMunicipio(municipio){
    return this.lstMunicipios.find(param => {
      if(param.municipio == municipio.municipio && 
        param.departamento == municipio.departamento){
          console.log('Encontro depto', param.departamento );
        return param.departamento;
      }      
    });
  }

  clearDate(formControlName: FormControl): void {
    if (formControlName.value !== "") {
      formControlName.reset();
    }
  }
  
  clearFilter(): void {
    //this.municipioFilter.setValue('');
    //this.conceptoCobroFilter.setValue('');
  }

  listener(){
    this.formControls.cuotaMinFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.multaMaxFilter.valueChanges.subscribe(()=>{this.filter();});
    this.formControls.numeroPagosFilter.valueChanges.subscribe(()=>{this.filter();});
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
  }

  cleanFilters() {
    this.form.reset();
    this.multasFiltradas.emit(this.multas);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
}