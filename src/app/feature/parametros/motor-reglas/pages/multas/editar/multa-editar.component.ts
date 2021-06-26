import { Component, Input, OnInit } from '@angular/core';

import { SubSink } from 'subsink';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { MessageService } from '@core/services/message.service';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { DivisionPoliticaService } from '@core/services/division-politica.service';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { Observable } from 'rxjs';
import { Concepto, CuotaMultaCreate, CuotasMultasDTO, MultasMunicipioAsignar, MultasUpdate, ParametroCreateTarifa, ParametroCreateMulta, Multas } from '@core/api/models';
import { MultaCrearParametrosComponent } from '../crear-parametros/multa-crear-parametros.component';
import { PagoMulta } from '@core/models/pagoMulta';
import { DomainService, MultasService, TarifasService } from '@core/api/services';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MultaEliminarComponent } from '../eliminar/multa-eliminar.component';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { AsociarMunicipiosComponent } from '../../../../valores-cobros/pages/tarifas/municipios/asociar-municipios.component';

const moment = _rollupMoment || _moment;



@Component({
  selector: 'app-multa-editar',
  templateUrl: './multa-editar.component.html',
  styleUrls: ['./multa-editar.component.scss']
})
export class MultaEditarComponent implements OnInit {

  @Input() dataFromModalWindow: any;
  @Input() multa: Multas;

  readonly SOLO_NUMEROS_ANNIOS = '^[0-9]{4}$';
  readonly SOLO_NUMEROS_DIEZ = '^[0-9]{1,10}$';

  valoresFijos : any[] = ['DIFER', 'IGUAL','MAYOR', 'MAY_IG', 'MENOR','MEN_IG'];
  valoresEntre : any[] = ['ENTRE', 'ENT_E', 'ENT_I', 'P_INC', 'P_EXC', 'E_EXCL','E_INCL'];

  paramCilindraje;
  paramTipoPlaca;
  paramTipoVehiculo;
  paramTipoCombustible;
  paramAnioVehiculo;
  paramAnioInscripcion;
  paramAnioCirculacion;
  paramAniosCirculacion;

  public showSpinner = false;
  private subs = new SubSink();
  public isDepartamentoSelected = false;

  public cuotasFiltro: any;
  public modoCobroFiltro: any;
  public tipoPlacaFiltro: any;
  public municipiosFiltro: any;
  public tipoVehiculoFiltro: any;
  public periodicidadFiltro: any;
  public conceptoCobroFiltro: any;
  public departamentosFiltro: any;

  parametros : any[] = [];
  pagos: PagoMulta[] = [];
  lstConceptos:  Concepto[] = [];
  lstTiposPlaca:  Observable<any[]>;
  lstTiposVehiculo:  Observable<any[]>;
  lstTiposCombustible:  Observable<any[]>;
  lstTarifas:  Observable<any[]>;
  lstRangosEntre:  any;
  lstRangosPeriodo:  any;
  lstModosCobro:  any;
  lstPeriodicidad:  any;
  lstValorVehiculo: Observable<any[]>;
  lstConceptoBase: Observable<any[]>;

  lstMultas: any[] = [];
  index: any;

  idConceptoOriginal;

  multasUpdate: MultasUpdate;
  paramsListUpdate : ParametroCreateMulta[] = [];
  cuotasListUpdate: CuotasMultasDTO[] = [];
  municipiosListUpdate: MultasMunicipioAsignar[] = [];

  public isPlacaSelected = false;
  public isVehiculoSelected = false;
  public isCombustibleSelected = false;
  public isCilindrajeSelected = false;
  public isAnnioVehiculoSelected = false;
  public isAnnioInscripSelected = false;
  public isAnnioCirculaSelected = false;
  public isAnniosCirculaSelected = false;

  public form = this.fb.group({
    nombre:    ['', [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.maxLength(200)]],
    normativa:    [''],
    descripcion:    ['', [Validators.pattern(new RegExp("\\S")), Validators.maxLength(150)]],
    tipoPlaca:      ['', [Validators.required]],
    conceptoCobro:  ['', [Validators.required]],
    tarifa:  [''],

    tipoVehiculo:   ['', [Validators.required]],
    tipoCombustible:   [''],
    modoCobro:      ['', [Validators.required]],
    modoCobroPorcentaje:      [''],
    modoCobroConcepto:      [''],
    modoCobroMontoMinimo:      [''],
    modoCobroVehiculo:      [''],
    modoCobroVehiculoMayor:   [''],
    modoCobroVehiculoMenor:   [''],
    modoCobroVehiculoFijo:   [''],
    

    valorMinimoCuota:    ['', [Validators.required]],
    valorMaximoCuota:    ['', [Validators.required]],

    numeroPagos:    ['', [Validators.required, Validators.min(1)]],
    cuotasList:     new FormArray([]),

    fechaInicial:    ['', [Validators.required]],
    fechaFinal:    [''],

    periodicidad:   [''],
    estado:         ['', [Validators.required]],  

    cilindraje:   [''],
    cilindrajeMayor:   ['', [Validators.pattern(this.SOLO_NUMEROS_DIEZ)]],
    cilindrajeMenor:   ['', [Validators.pattern(this.SOLO_NUMEROS_DIEZ)]],
    cilindrajeFijo:   ['', [Validators.pattern(this.SOLO_NUMEROS_DIEZ)]],

    anioVehiculo:   [''],
    anioVehiculoMayor:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
    anioVehiculoMenor:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
    anioVehiculoFijo:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],

    anioInscripcion:   [''],
    anioInscripcionMayor:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
    anioInscripcionMenor:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
    anioInscripcionFijo:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],

    anioCirculacion:   [''],
    anioCirculacionMayor:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
    anioCirculacionMenor:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
    anioCirculacionFijo:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],

    aniosCirculacion:   [''],
    aniosCirculacionMayor:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
    aniosCirculacionMenor:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
    aniosCirculacionFijo:   ['', [Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],

    observaciones:           ['', [Validators.required, Validators.maxLength(500)]]
  }, {validators: [
    validateRangoCilindraje, 
    validateRangoAnioVehiculo,
    validateRangoAnioInscripcion,
    validateRangoAnioCirculacion,
    validateRangoAniosCirculacion,, 
    validateRangoValorVehiculo]});   

  constructor(
    private fb: FormBuilder,
    private multaSvc: MultasService,
    private messageSvc: MessageService,
    private filtrosTablaSvc: FiltrosTablaService,
    private divisionPoliticaSvc: DivisionPoliticaService,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
    public dialog: MatDialog,
    private tarifasSvc: TarifasService,
    private toastr: ToastrService,
    private domainSvc: DomainService,
  ) { 
    this.showSpinner = true;
  } 


  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {    
    this.formControls.normativa.disable();
    this.multa = this.dataFromModalWindow.multa;
    this.index = this.multa?.detalleMultaList?.length - 1;
    this.idConceptoOriginal = this.multa.idParConcepto?.id;
    this.lstTiposPlaca = this.dataFromModalWindow.lstTiposPlaca;
    this.lstTiposVehiculo = this.dataFromModalWindow.lstTiposVehiculo;
    this.lstTiposCombustible = this.dataFromModalWindow.lstTiposCombustible;
    this.lstPeriodicidad = this.dataFromModalWindow.lstPeriodicidad;
    this.lstMultas = this.dataFromModalWindow.lstMultas;
    this.loadParametros();
    this.getValoresSelect();  
    this.loadMunicipios();

  }
  
  private loadMunicipios(): void {
    console.log('multa entrante', this.multa);
    this.municipiosListUpdate =  this.multa?.detalleMultaList[this.index]?.multaMunicipioList?.map(x => {
        return {
          idMunicipio: x?.tnParMultaMunicipioPK?.municipio,
          idDepartamento: x?.tnParMultaMunicipioPK?.departamento
        }
      });
  }

  compareTipoVehiculo(vh1: any, vh2: any): boolean {
    return vh1?.id === vh2?.id;
  }  

  private setForm(): void {
    this.setParametros();
    //this.form.patchValue({...this.multa} , { emitEvent: false });

    this.formControls.conceptoCobro.setValue(this.multa.idParConcepto?.id);
    this.changesConcepto();

    this.formControls.nombre.setValue(this.multa.nombre);
    this.formControls.descripcion.setValue(this.multa.descripcion);
    this.formControls.tarifa.setValue(this.multa.detalleMultaList[this.index]?.tarifa?.id);
    this.formControls.modoCobro.setValue(this.multa.detalleMultaList[this.index]?.modoCobro);
    this.formControls.modoCobroMontoMinimo.setValue(this.multa.detalleMultaList[this.index]?.montoMinimo);
    this.formControls.modoCobroPorcentaje.setValue(this.multa.detalleMultaList[this.index]?.valorPorcentaje);
    this.formControls.modoCobroConcepto.setValue(this.multa.detalleMultaList[this.index]?.referenciaPorcentaje);

    this.formControls.modoCobroVehiculo.setValue(this.multa.detalleMultaList[this.index]?.operValVehiculo);  
    this.formControls.modoCobroVehiculoFijo.setValue(this.multa.detalleMultaList[this.index]?.valMinVehiculo);  
    this.formControls.modoCobroVehiculoMenor.setValue(this.multa.detalleMultaList[this.index]?.valMinVehiculo);  
    this.formControls.modoCobroVehiculoMayor.setValue(this.multa.detalleMultaList[this.index]?.valMaxVehiculo);  


    this.formControls.valorMinimoCuota.setValue(this.multa.detalleMultaList[this.index]?.valorMinimo);
    this.formControls.valorMaximoCuota.setValue(this.multa.detalleMultaList[this.index]?.valorMaximo);
    this.formControls.numeroPagos.setValue(this.multa.detalleMultaList[this.index]?.numeroCuotas);
    this.formControls.fechaInicial.setValue(moment(this.multa.detalleMultaList[this.index]?.fechaInicioVigencia, 'YYYY-MM-DD'));
    this.formControls.fechaFinal.setValue(this.multa.detalleMultaList[this.index]?.fechaFinVigencia ? moment(this.multa.detalleMultaList[this.index]?.fechaFinVigencia, 'YYYY-MM-DD') : '');
    this.formControls.periodicidad.setValue(this.multa.detalleMultaList[this.index]?.periodicidad);
    this.formControls.estado.setValue( this.multa.estado == 'A' ? true : false);

    this.formControls.observaciones.setValue( this.multa.observaciones);

    this.onAddCuotaSetForm();
    this.changesModoCobro();
    this.showSpinner = false;

  }

  setParametroDinamico(nombre: string, param: any): void {
    if (nombre.includes('anio') && param?.desDominio === 'ENT_I') {
      this.form.get(nombre).patchValue('P_INC', {emitEvent: true});    
    } else {
      this.form.get(nombre).patchValue(param?.desDominio, {emitEvent: true});    
    }
    this.form.get(nombre + 'Fijo').patchValue(param?.valorMin, {emitEvent: true});    
    this.form.get(nombre + 'Menor').patchValue((param?.valorMax ? param?.valorMin : ''), {emitEvent: true});    
    this.form.get(nombre + 'Mayor').patchValue(param?.valorMax, {emitEvent: true});
  }


  private setParametros(): void {
    this.multa.condicionTarifaList[this.multa.condicionTarifaList.length-1]?.parametrosList.forEach(param => {
        if(param.nombre == 'CILINDRAJE'){
          this.parametros.push({nombre: 'CILINDRAJE', estado: '1'});
          this.paramCilindraje = param;
          this.setParametroDinamico('cilindraje', param);
          this.isCilindrajeSelected = true;
        }else if(param.nombre == 'TIPO_VEHICULO'){
          this.parametros.push({nombre: 'TIPO_VEHICULO', estado: '1'});
          this.paramTipoVehiculo = param;
          let vehiculo;
          this.lstTiposVehiculo.subscribe(vh => {
            vehiculo = vh.find(x => x?.id == this.paramTipoVehiculo?.valorMin)
          this.form.get('tipoVehiculo').setValue(vehiculo);    
          });
        }else if(param.nombre == 'CLASE_PLACA'){
          this.parametros.push({nombre: 'CLASE_PLACA', estado: '1'});
          this.paramTipoPlaca = param;
          this.formControls.tipoPlaca.setValue(this.paramTipoPlaca ?  this.paramTipoPlaca.valorMin : '');
        }else if(param.nombre == 'TIPO_COMBUSTIBLE'){
          this.parametros.push({nombre: 'TIPO_COMBUSTIBLE', estado: '1'});
          this.paramTipoCombustible = param;
          this.isCombustibleSelected = true;
          this.formControls.tipoCombustible.setValue(this.paramTipoCombustible ?  this.paramTipoCombustible.valorMin : '');
        }else if(param.nombre == 'ANNIO_VEHICULO'){
          this.parametros.push({nombre: 'ANNIO_VEHICULO', estado: '1'});
          this.paramAnioVehiculo = param;
          this.isAnnioVehiculoSelected = true;
          this.setParametroDinamico('anioVehiculo', param);
        }else if(param.nombre == 'ANNIO_INSCRIPCION'){
          this.parametros.push({nombre: 'ANNIO_INSCRIPCION', estado: '1'});
          this.paramAnioInscripcion = param;
          this.isAnnioInscripSelected = true;
          this.setParametroDinamico('anioInscripcion', param);
        }else if(param.nombre == 'ANNIO_CIRCULACION'){
          this.parametros.push({nombre: 'ANNIO_CIRCULACION', estado: '1'});
          this.paramAnioCirculacion = param;
          this.isAnnioCirculaSelected = true;
          this.setParametroDinamico('anioCirculacion', param);
        }else if(param.nombre == 'ANNIOS_CIRCULACION'){
          this.parametros.push({nombre: 'ANNIOS_CIRCULACION', estado: '1'});
          this.paramAniosCirculacion = param;
          this.isAnniosCirculaSelected = true;
          this.setParametroDinamico('aniosCirculacion', param);
        }
    });
    this.loadParametros();
  }
  
  getValoresSelect(){
    this.getConceptos();
    this.lstRangosEntre = this.filtrosTablaSvc.rangoEntre();
    this.lstRangosPeriodo = this.filtrosTablaSvc.rangoPeriodo();
    this.lstModosCobro = this.filtrosTablaSvc.modoCobro();
    this.departamentosFiltro = this.filtrosTablaSvc.departamentos();
    this.lstValorVehiculo = this.domainSvc.getDomainsByIdUsingGET('ROPERADOR');
    this.lstConceptoBase = this.filtrosTablaSvc.conceptoBase();


  }

  getConceptos(){
    this.filtrosTablaSvc.conceptosDebitoActVigentesMulta()
    .subscribe({
      next: data => {
        console.log('conceptos', data);
        this.lstConceptos = data;
        this.setForm();

        let conceptoOrigen=this.lstConceptos.find(concepto => {
          return concepto.id == this.multa?.idParConcepto?.id
        });

        if(!conceptoOrigen){
          this.lstConceptos.push(this.multa?.idParConcepto);
        }
      },
      //complete: () => this.showSpinner = false
    });
  }

  onChangeDepartamento(departamentoId: number): void {
    const departamentos = this.divisionPoliticaSvc.getDepartamentos();
    const departamentoEncontrado = departamentos.find(departamento => departamento.id === departamentoId);
    this.municipiosFiltro = departamentoEncontrado.municipios;
    this.isDepartamentoSelected = true;
  } 

  
  changesModoCobro(){
    console.log('Modo cobro',this.formControls.modoCobro.value );
    this.updateValMaxMulta();
    console.log('holaaaa');
    if(this.formControls.modoCobro.value == 'MONT_F'){
      this.formControls.valorMinimoCuota.disable();
      this.formControls.valorMaximoCuota.enable();
    }else if(this.formControls.modoCobro.value == 'PORCEN'){
      this.formControls.valorMinimoCuota.enable();
      this.formControls.valorMaximoCuota.disable();
    }
  }

  changesTipoVehiculo(){
    if(this.formControls.modoCobro.value == 'MONT_F'){
      this.formControls.valorMinimoCuota.setValue(this.formControls.tipoVehiculo.value.valorMinimoCuota);
      this.formControls.valorMaximoCuota.setValue(this.formControls.tipoVehiculo.value.valorMaximoMulta);
    }
  }

  changesPeriodicidad(){
    if(this.formControls.periodicidad.value == 'PERIOR02'){
      this.formControls.numeroPagos.setValue('1');
      this.formControls.numeroPagos.disable();
      this.onAddCuota();
    }else if(this.formControls.periodicidad.value == 'PERIOR03'){
      this.formControls.numeroPagos.setValue('1');
      this.formControls.numeroPagos.enable();
      this.onAddCuota();
    }else {
      this.formControls.numeroPagos.enable();
    }
  }

  changesConcepto(){
    let con = this.lstConceptos.find(concepto => 
      concepto.id == Number(this.formControls.conceptoCobro.value)
    );
    this.formControls.normativa.setValue(con?.normativa ? con?.normativa?.nombre : '');  

    //Consultar tarifas según concepto
    this.lstTarifas = this.tarifasSvc.getTarifaByConceptoUsingGET(Number(this.formControls.conceptoCobro.value));   
  }
  onAddCuotaSetForm() {
    if(this.formControls.numeroPagos.value){
      for(let i=0; i< this.formControls.numeroPagos.value; i++){
        (this.form.get('cuotasList') as FormArray)
        .push(new FormControl(this.multa.detalleMultaList[this.index]?.cuotaMultaList[i]?.valor,
           [Validators.required, Validators.min(this.formControls.valorMinimoCuota.value)]))
      }  
    }else {
      while ((this.form.get('cuotasList') as FormArray).length > 0) {
        (this.form.get('cuotasList') as FormArray).removeAt(0)
      }
    }

    console.log('CuotasFomr', this.formControls.cuotasList.value);
  }

  onChangeMontoMin(){
    this.formControls.valorMaximoCuota.setValue(this.formControls.modoCobroMontoMinimo.value);
  }


  onAddCuota() {
    if(this.formControls.numeroPagos.value){
      if((this.form.get('cuotasList') as FormArray).length <= this.formControls.numeroPagos.value ){
        for(let i=(this.form.get('cuotasList') as FormArray).length; i< this.formControls.numeroPagos.value; i++){
          (this.form.get('cuotasList') as FormArray)
          .push(new FormControl('', [Validators.required, Validators.min(this.formControls.valorMinimoCuota.value)]))
        }
      }else{
        while ((this.form.get('cuotasList') as FormArray).length > this.formControls.numeroPagos.value) {
          (this.form.get('cuotasList') as FormArray).removeAt(0)
        }
      } 
    }else {
      while ((this.form.get('cuotasList') as FormArray).length !== 0) {
        (this.form.get('cuotasList') as FormArray).removeAt(0)
      }
    }

    console.log('CuotasFomr', this.formControls.cuotasList.value);
  }

  cuotaArray():FormArray {
    return this.form.get('cuotasList') as FormArray
  }
  
  onChangeValMin(){
    if(this.formControls.numeroPagos.value){
      for(let i=0 ; i< this.formControls.numeroPagos.value; i++){
        (this.form.get('cuotasList') as FormArray).controls[i]
        .setValidators([Validators.required, Validators.min(this.formControls.valorMinimoCuota.value)]);
        (this.form.get('cuotasList') as FormArray).controls[i]
        .setValue('');
      }

    }
  }

  updateValMaxMulta(){
    let suma=0;
    console.log('Numero pagos', this.formControls.numeroPagos.value);
    for(let i=0 ; i< this.formControls.numeroPagos.value; i++){
      suma+= (<FormArray>this.form.get('cuotasList')).controls[i].value
    }
    if(this.formControls.modoCobro.value == 'MONT_F'){
      this.formControls.valorMaximoCuota.setValidators([Validators.min(suma)]);   
      this.formControls.valorMaximoCuota.updateValueAndValidity(); 
      this.formControls.valorMaximoCuota.markAsTouched(); 
    }else if(this.formControls.modoCobro.value == 'PORCEN'){
      this.formControls.modoCobroMontoMinimo.setValidators([Validators.min(suma)]);   
      this.formControls.modoCobroMontoMinimo.updateValueAndValidity(); 
      this.formControls.modoCobroMontoMinimo.markAsTouched(); 
    }
  }

  loadParametros(){
    this.isVehiculoSelected = (this.parametros.find(x => x.nombre =='TIPO_VEHICULO' && x.estado == '1')) ? true : false;
    this.isCombustibleSelected = (this.parametros.find(x => x.nombre =='TIPO_COMBUSTIBLE'  && x.estado == '1')) ? true : false;
    this.isCilindrajeSelected = (this.parametros.find(x => x.nombre =='CILINDRAJE'  && x.estado == '1')) ? true : false;
    this.isAnnioVehiculoSelected = (this.parametros.find(x => x.nombre =='ANNIO_VEHICULO'  && x.estado == '1')) ? true : false;
    this.isAnnioInscripSelected = (this.parametros.find(x => x.nombre =='ANNIO_INSCRIPCION'  && x.estado == '1')) ? true : false;
    this.isAnnioCirculaSelected = (this.parametros.find(x => x.nombre =='ANNIO_CIRCULACION'  && x.estado == '1')) ? true : false;
    this.isAnniosCirculaSelected = (this.parametros.find(x => x.nombre =='ANNIOS_CIRCULACION'  && x.estado == '1')) ? true : false;
  
    this.loadValidatorsParams();
  }

  loadValidatorsParams(){
    this.isCilindrajeSelected ? this.formControls.cilindraje.enable() : 
    ( this.formControls.cilindraje.setValue(''), 
      this.changesCilindraje())
  
    this.isAnnioVehiculoSelected ? this.formControls.anioVehiculo.enable() : 
    ( this.formControls.anioVehiculo.setValue(''),
      this.changesAnioVehiculo());

    this.isAnnioInscripSelected ? this.formControls.anioInscripcion.enable() :
    ( this.formControls.anioInscripcion.setValue(''),
     this.changesAnioInscripcion());

    this.isAnnioCirculaSelected ? this.formControls.anioCirculacion.enable() : 
    ( this.formControls.anioCirculacion.setValue(''),
     this.changesAnioCirculacion());

    this.isAnniosCirculaSelected ? this.formControls.aniosCirculacion.enable() : 
    (this.formControls.aniosCirculacion.setValue(''),
     this.changesAniosCirculacion());

  }

  openAsociarMunicipios(){
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '50vw',
      disableClose: true,
      data: { 
        dataComponent: {
          title: 'Asociar municipios',
          municipios: this.municipiosListUpdate
        },
        component: AsociarMunicipiosComponent
      }
    });

    dialogRef.afterClosed()
    .subscribe(municipios => {
      if (municipios) {
        this.municipiosListUpdate = municipios;
      }
    })
  }
  
  buscarParametro(x, parametro: string) : any{
      return x.condicionTarifaList[0]?.parametrosList.find(param => {
      if(param.nombre == parametro ){
        return param;
      }      
    });
  }
  changesCilindraje(){
    if(this.valoresFijos.includes(this.formControls.cilindraje.value)){
      this.formControls.cilindrajeFijo.enable();
      this.formControls.cilindrajeMayor.disable();
      this.formControls.cilindrajeMenor.disable();
    }else if(this.valoresEntre.includes(this.formControls.cilindraje.value)){
      this.formControls.cilindrajeFijo.disable();
      this.formControls.cilindrajeMayor.enable();
      this.formControls.cilindrajeMenor.enable();
    }
  }

  changesAnioVehiculo(){
    if(this.valoresFijos.includes(this.formControls.anioVehiculo.value)){
      this.formControls.anioVehiculoFijo.enable();
      this.formControls.anioVehiculoMayor.disable();
      this.formControls.anioVehiculoMenor.disable();
    }else if(this.valoresEntre.includes(this.formControls.anioVehiculo.value)){
      this.formControls.anioVehiculoFijo.disable();
      this.formControls.anioVehiculoMayor.enable();
      this.formControls.anioVehiculoMenor.enable();
    }
  }

  changesAnioInscripcion(){
    if(this.valoresFijos.includes(this.formControls.anioInscripcion.value)){
      this.formControls.anioInscripcionFijo.enable();
      this.formControls.anioInscripcionMayor.disable();
      this.formControls.anioInscripcionMenor.disable();
    }else if(this.valoresEntre.includes(this.formControls.anioInscripcion.value)){
      this.formControls.anioInscripcionFijo.disable();
      this.formControls.anioInscripcionMayor.enable();
      this.formControls.anioInscripcionMenor.enable();
    }
  }

  changesAnioCirculacion(){
    if(this.valoresFijos.includes(this.formControls.anioCirculacion.value)){
      this.formControls.anioCirculacionFijo.enable();
      this.formControls.anioCirculacionMayor.disable();
      this.formControls.anioCirculacionMenor.disable();
    }else if(this.valoresEntre.includes(this.formControls.anioCirculacion.value)){
      this.formControls.anioCirculacionFijo.disable();
      this.formControls.anioCirculacionMayor.enable();
      this.formControls.anioCirculacionMenor.enable();
    }
  }

  changesAniosCirculacion(){
    if(this.valoresFijos.includes(this.formControls.aniosCirculacion.value)){
      this.formControls.aniosCirculacionFijo.enable();
      this.formControls.aniosCirculacionMayor.disable();
      this.formControls.aniosCirculacionMenor.disable();
    }else if(this.valoresEntre.includes(this.formControls.aniosCirculacion.value)){
      this.formControls.aniosCirculacionFijo.disable();
      this.formControls.aniosCirculacionMayor.enable();
      this.formControls.aniosCirculacionMenor.enable();
    }
  }

  onlyNumberMonto(e: any): boolean {
    if (e)
      return ((e.keyCode > 95 && e.keyCode < 106  && e.keyCode != 101)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8 || e.code == 'Comma' || e.keyCode == 188);
  }

  onlyNumber(e: any): boolean {
    if (e)
      return ((e.keyCode > 95 && e.keyCode < 106  && e.keyCode != 101)
        || (e.keyCode > 47 && e.keyCode < 58));
  }

  onChangeValuesAnioCirculaVehi(){
    if(this.formControls.anioCirculacion.value && this.formControls.anioVehiculo.value){
      this.valVehiculoCirculacion();
    }else {
      this.formControls.anioCirculacionFijo.setValidators([]);   
      this.formControls.anioCirculacionFijo.updateValueAndValidity();   
      this.formControls.anioCirculacionMayor.setValidators([]);   
      this.formControls.anioCirculacionMayor.updateValueAndValidity(); 
    }

    if(this.formControls.anioInscripcion.value && this.formControls.anioVehiculo.value){
      this.valVehiculoInscripcion();
    }else {
      this.formControls.anioInscripcionFijo.setValidators([]);   
      this.formControls.anioInscripcionFijo.updateValueAndValidity();   
      this.formControls.anioInscripcionMayor.setValidators([]);   
      this.formControls.anioInscripcionMayor.updateValueAndValidity(); 
    }
  }

  valVehiculoCirculacion(){
          //Validar parejas
      if((this.valoresFijos.includes(this.formControls.anioCirculacion.value) &&
      this.valoresFijos.includes(this.formControls.anioVehiculo.value) &&
      this.formControls.anioCirculacionFijo.value < this.formControls.anioVehiculoFijo.value)){
        this.formControls.anioCirculacionFijo.setValidators([Validators.min(this.formControls.anioVehiculoFijo.value),
                                                             Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
        this.formControls.anioCirculacionFijo.updateValueAndValidity();   
    } else
      if((this.valoresEntre.includes(this.formControls.anioCirculacion.value) &&
          this.valoresEntre.includes(this.formControls.anioVehiculo.value) &&
          this.formControls.anioCirculacionMayor.value < this.formControls.anioVehiculoMenor.value)){
            this.formControls.anioCirculacionMayor.setValidators([Validators.min(this.formControls.anioVehiculoMenor.value),
                                                                  Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
            this.formControls.anioCirculacionMayor.updateValueAndValidity();       
       } else
       if((this.valoresFijos.includes(this.formControls.anioCirculacion.value) &&
       this.valoresEntre.includes(this.formControls.anioVehiculo.value) &&
       this.formControls.anioCirculacionFijo.value < this.formControls.anioVehiculoMenor.value)){
         this.formControls.anioCirculacionFijo.setValidators([Validators.min(this.formControls.anioVehiculoMenor.value),
                                                              Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
         this.formControls.anioCirculacionFijo.updateValueAndValidity();   
       }

       if((this.valoresEntre.includes(this.formControls.anioCirculacion.value) &&
       this.valoresFijos.includes(this.formControls.anioVehiculo.value) &&
       this.formControls.anioCirculacionMayor.value < this.formControls.anioVehiculoFijo.value)){
         this.formControls.anioCirculacionMayor.setValidators([Validators.min(this.formControls.anioVehiculoFijo.value),
                                                               Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
         this.formControls.anioCirculacionMayor.updateValueAndValidity();   
       }
  }

  valVehiculoInscripcion(){
         //Validar parejas
         if((this.valoresFijos.includes(this.formControls.anioInscripcion.value) &&
         this.valoresFijos.includes(this.formControls.anioVehiculo.value) &&
         this.formControls.anioInscripcionFijo.value < this.formControls.anioVehiculoFijo.value)){
           this.formControls.anioInscripcionFijo.setValidators([Validators.min(this.formControls.anioVehiculoFijo.value),
                                                                Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
           this.formControls.anioInscripcionFijo.updateValueAndValidity();   
       } else
         if((this.valoresEntre.includes(this.formControls.anioInscripcion.value) &&
             this.valoresEntre.includes(this.formControls.anioVehiculo.value) &&
             this.formControls.anioInscripcionMayor.value < this.formControls.anioVehiculoMenor.value)){
               this.formControls.anioInscripcionMayor.setValidators([Validators.min(this.formControls.anioVehiculoMenor.value),
                                                                     Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
               this.formControls.anioInscripcionMayor.updateValueAndValidity();       
          } else
          if((this.valoresFijos.includes(this.formControls.anioInscripcion.value) &&
          this.valoresEntre.includes(this.formControls.anioVehiculo.value) &&
          this.formControls.anioInscripcionFijo.value < this.formControls.anioVehiculoMenor.value)){
            this.formControls.anioInscripcionFijo.setValidators([Validators.min(this.formControls.anioVehiculoMenor.value),
                                                                 Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
            this.formControls.anioInscripcionFijo.updateValueAndValidity();   
          }
   
          if((this.valoresEntre.includes(this.formControls.anioInscripcion.value) &&
          this.valoresFijos.includes(this.formControls.anioVehiculo.value) &&
          this.formControls.anioInscripcionMayor.value < this.formControls.anioVehiculoFijo.value)){
            this.formControls.anioInscripcionMayor.setValidators([Validators.min(this.formControls.anioVehiculoFijo.value),
                                                                  Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
            this.formControls.anioInscripcionMayor.updateValueAndValidity();   
          }
  }

  onSubmitEdit(): void {
    
    if(!this.validarNombreMulta()){
      this.showSpinner = true;
      this.crearListaParametros();

      //Cuotas
      this.cuotasListUpdate = [];
      let valMulta = 0;
      this.formControls.cuotasList.value.forEach(pago => {
        valMulta += pago;
        let cuota : CuotaMultaCreate = {
          valor : pago
        }
        this.cuotasListUpdate.push(cuota);
      });

      if(this.formControls.valorMaximoCuota.value >= valMulta){
        this.multasUpdate = {
          id : this.multa.multa,
          nombre : this.formControls.nombre.value,
          descripcion: this.formControls.descripcion.value,
          estado: this.formControls.estado.value == true ? 'A' : 'I',
          //clasePlaca: this.formControls.tipoPlaca.value,
          concepto: this.formControls.conceptoCobro.value,
          tarifa: this.formControls.tarifa.value,
          modoCobro: this.formControls.modoCobro.value,
          valorMinimo: this.formControls.valorMinimoCuota.value,
          valorMaximo: this.formControls.valorMaximoCuota.value,
          montoMinimo: this.formControls.modoCobroMontoMinimo.value,
          numeroCuotas: this.formControls.numeroPagos.value,
          fechaInicial:this.formControls.fechaInicial.value.format('YYYY-MM-DD'), 
          fechaFinal:this.formControls.fechaFinal.value ? this.formControls.fechaFinal.value.format('YYYY-MM-DD') : '', 
          periodicidad: this.formControls.periodicidad.value, 
          operValVehiculo: this.formControls.modoCobroVehiculo.value,
          valMinVehiculo: this.formControls.modoCobroVehiculoFijo.value ? this.formControls.modoCobroVehiculoFijo.value :
             this.formControls.modoCobroVehiculoMenor.value,
          valMaxVehiculo: this.formControls.modoCobroVehiculoMayor.value,
          valorPorcentaje: this.formControls.modoCobroPorcentaje.value,
          referenciaPorcentaje: this.formControls.modoCobroConcepto.value,

          //Paramteros
          parametrosList: this.paramsListUpdate,

          modificado: this.validarCamposImportantes(),
          
          //Cuotas
          lstCuotas: this.cuotasListUpdate,
        
          municipiosList: this.municipiosListUpdate,

          observaciones: this.formControls.observaciones.value
          }

          this.multaSvc.updateMultaUsingPUT(this.multasUpdate)
          .subscribe({
            next: data => {
              this.dialogRef.close('Refrescar');
              this.toastr.success('Registro actualizado exitosamente!');          
            },
            error: err => {
              this.showSpinner = false;
              this.toastr.error('Ha ocurrido un error, por favor intente más tarde');  
            },
            complete: () => this.showSpinner = false
          })

        console.log('Multa Crear', this.multasUpdate);
            
        return;
      }else {
        this.toastr.error('Valor total de cuotas excede el valor máximo de la multa'); 
        this.showSpinner = false;
      }
    }else{
      this.toastr.error('La multa ya se encuentra parametrizada, favor valide'); 
      this.showSpinner = false;
    }
    
  }

  validarNombreMulta(){
    this.formControls.nombre.setValue(this.formControls.nombre.value.trim());
    return this.lstMultas.find(ele => ele.nombre == this.formControls.nombre.value &&
                              ele.estado == (this.formControls.estado.value == true ? 'A' : 'I') && 
                              ele.multa != this.multa.multa &&
                              ele.detalleMultaList[this.index]?.fechaFinVigencia !== null &&
                              ele.detalleMultaList[this.index]?.fechaFinVigencia >= this.formControls.fechaInicial.value.format('YYYY-MM-DD') )
  }

  openParametros() {
    this.dialog.open(MultaCrearParametrosComponent, {
      data: {
        parametros: this.parametros
      }
    })

    .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.parametros = confirmado;
          console.log(confirmado);
          this.loadParametros();
        }
      });
  }

  crearListaParametros(){
    if(this.formControls.tipoVehiculo.value.id && this.formControls.tipoVehiculo.value.id != ''){
      let parametro : ParametroCreateMulta = {
      nombre : 'TIPO_VEHICULO'}
      parametro.operadorMin = '=';          
      parametro.valorMin = this.formControls.tipoVehiculo.value.id;

      this.paramsListUpdate.push(parametro);
    }

    if(this.formControls.tipoPlaca.value && this.formControls.tipoPlaca.value != ''){
      let parametro : ParametroCreateMulta = {
      nombre : 'CLASE_PLACA'}
      parametro.operadorMin = '=';          
      parametro.valorMin = this.formControls.tipoPlaca.value;

      this.paramsListUpdate.push(parametro);
    }

    if(this.formControls.tipoCombustible.value && this.formControls.tipoCombustible.value != ''){
      let parametro : ParametroCreateMulta = {
      nombre : 'TIPO_COMBUSTIBLE'}
      parametro.operadorMin = '=';          
      parametro.valorMin = this.formControls.tipoCombustible.value;

      this.paramsListUpdate.push(parametro);
    }
 
    if(this.formControls.cilindraje.value  && this.formControls.cilindraje.value !='NO_APL'){
      let parametro : ParametroCreateMulta = {
        nombre : 'CILINDRAJE'
      };
      parametro.operadorMin = this.formControls.cilindraje.value;
      if(this.valoresFijos.includes(this.formControls.cilindraje.value)){            
        parametro.valorMin = this.formControls.cilindrajeFijo.value;
      }else{
        parametro.operadorMax = this.formControls.cilindraje.value;
        parametro.valorMin = this.formControls.cilindrajeMenor.value;
        parametro.valorMax = this.formControls.cilindrajeMayor.value;
      }
      this.paramsListUpdate.push(parametro);
    }

    if(this.formControls.anioVehiculo.value && this.formControls.anioVehiculo.value !='NO_APL'){
      let parametro : ParametroCreateMulta = {
        nombre : 'ANNIO_VEHICULO'
      };
      parametro.operadorMin = this.formControls.anioVehiculo.value;
      if(this.valoresFijos.includes(this.formControls.anioVehiculo.value)){            
        parametro.valorMin = this.formControls.anioVehiculoFijo.value;
      }else{
        parametro.operadorMax = this.formControls.anioVehiculo.value;
        parametro.valorMin = this.formControls.anioVehiculoMenor.value;
        parametro.valorMax = this.formControls.anioVehiculoMayor.value;
      }
      this.paramsListUpdate.push(parametro);
    }
    
    if(this.formControls.anioInscripcion.value && this.formControls.anioInscripcion.value !='NO_APL'){
      let parametro : ParametroCreateMulta = {
        nombre : 'ANNIO_INSCRIPCION'
      };
      parametro.operadorMin = this.formControls.anioInscripcion.value;
      if(this.valoresFijos.includes(this.formControls.anioInscripcion.value)){            
        parametro.valorMin = this.formControls.anioInscripcionFijo.value;
      }else{
        parametro.operadorMax = this.formControls.anioInscripcion.value;
        parametro.valorMin = this.formControls.anioInscripcionMenor.value;
        parametro.valorMax = this.formControls.anioInscripcionMayor.value;
      }
      this.paramsListUpdate.push(parametro);
    }

    if(this.formControls.anioCirculacion.value && this.formControls.anioCirculacion.value !='NO_APL'){
      let parametro : ParametroCreateMulta = {
        nombre : 'ANNIO_CIRCULACION'
      };
      parametro.operadorMin = this.formControls.anioCirculacion.value;
      if(this.valoresFijos.includes(this.formControls.anioCirculacion.value)){            
        parametro.valorMin = this.formControls.anioCirculacionFijo.value;
      }else{
        parametro.operadorMax = this.formControls.anioCirculacion.value;
        parametro.valorMin = this.formControls.anioCirculacionMenor.value;
        parametro.valorMax = this.formControls.anioCirculacionMayor.value;
      }
      this.paramsListUpdate.push(parametro);
    }

    if(this.formControls.aniosCirculacion.value && this.formControls.aniosCirculacion.value !='NO_APL'){
      let parametro : ParametroCreateMulta = {
        nombre : 'ANNIOS_CIRCULACION'
      };
      parametro.operadorMin = this.formControls.aniosCirculacion.value;
      if(this.valoresFijos.includes(this.formControls.aniosCirculacion.value)){            
        parametro.valorMin = this.formControls.aniosCirculacionFijo.value;
      }else{
        parametro.operadorMax = this.formControls.aniosCirculacion.value;
        parametro.valorMin = this.formControls.aniosCirculacionMenor.value;
        parametro.valorMax = this.formControls.aniosCirculacionMayor.value;
      }
      this.paramsListUpdate.push(parametro);
    }

  }

  validarCamposImportantes(){
    return this.formControls.fechaInicial.dirty || this.formControls.fechaFinal.dirty ||
     this.formControls.valorMinimoCuota.dirty || this.formControls.valorMaximoCuota.dirty ||
     this.formControls.cuotasList.dirty || this.formControls.tipoVehiculo.dirty ||
     this.formControls.tipoPlaca.dirty || this.formControls.tipoCombustible.dirty ||
     this.formControls.cilindraje.dirty || this.formControls.anioVehiculo.dirty ||
     this.formControls.anioInscripcion.dirty || this.formControls.anioCirculacion.dirty ||
     this.formControls.modoCobro.dirty || this.formControls.anioCirculacion.dirty ||
     this.formControls.numeroPagos.dirty || this.formControls.tarifa.dirty || 
     this.formControls.estado.dirty 
  }

  onDelete(){
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '45vw',
      disableClose: true,
      data: { 
        dataComponent: {
          data:  this.multa,
          title: 'Eliminar multa'
        },
        component: MultaEliminarComponent
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`Dialog result delete: ${result}`);
        if(result == 'Eliminado'){
          this.dialogRef.close('Refrescar');
        }       
      });
  }
  confirmarSalir(){
    if (this.form.dirty) {
      this.dialog
      .open(ConfirmationDialogComponent, {
          data: {
              titulo: 'Editar multa',
              mensaje: '¿Desea salir sin guardar la información?',
          },
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.dialogRef.close();
        }
      });
    }else {
      this.dialogRef.close();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}


export function validateRangoCilindraje(control: AbstractControl): {[key: string]: boolean} | null {
  if (control && control.get('cilindrajeMenor') && control.get('cilindrajeMayor')) {
    const min = control.get('cilindrajeMenor').value;
    const max = control.get('cilindrajeMayor').value;
    let errores = control.get('cilindrajeMenor').errors;
    if (!errores) {
      errores = null;
    }
    if (min > max) {
      if (errores)
        errores.rango = true;
      else
        errores = {rango: true};
    }
    else if (control.get('cilindrajeMenor').hasError('rango')) {
      delete errores.rango;
      const keys = Object.keys(errores);
      if (keys.length <= 0)
        errores = null;
    }
    control.get('cilindrajeMenor').setErrors(errores);
    return;
  }
}

export function validateRangoAnioVehiculo(control: AbstractControl): {[key: string]: boolean} | null {
  if (control && control.get('anioVehiculoMenor') && control.get('anioVehiculoMayor')) {
    const min = control.get('anioVehiculoMenor').value;
    const max = control.get('anioVehiculoMayor').value;
    let errores = control.get('anioVehiculoMenor').errors;
    if (!errores) {
      errores = null;
    }
    if (min > max) {
      if (errores)
        errores.rango = true;
      else
        errores = {rango: true};
    }
    else if (control.get('anioVehiculoMenor').hasError('rango')) {
      delete errores.rango;
      const keys = Object.keys(errores);
      if (keys.length <= 0)
        errores = null;
    }
    control.get('anioVehiculoMenor').setErrors(errores);
    return;
  }
}

export function validateRangoAnioInscripcion(control: AbstractControl): {[key: string]: boolean} | null {
  if (control && control.get('anioInscripcionMenor') && control.get('anioInscripcionMayor')) {
    const min = control.get('anioInscripcionMenor').value;
    const max = control.get('anioInscripcionMayor').value;
    let errores = control.get('anioInscripcionMenor').errors;
    if (!errores) {
      errores = null;
    }
    if (min > max) {
      if (errores)
        errores.rango = true;
      else
        errores = {rango: true};
    }
    else if (control.get('anioInscripcionMenor').hasError('rango')) {
      delete errores.rango;
      const keys = Object.keys(errores);
      if (keys.length <= 0)
        errores = null;
    }
    control.get('anioInscripcionMenor').setErrors(errores);
    return;
  }
}

export function validateRangoAnioCirculacion(control: AbstractControl): {[key: string]: boolean} | null {
  if (control && control.get('anioCirculacionMenor') && control.get('anioCirculacionMayor')) {
    const min = control.get('anioCirculacionMenor').value;
    const max = control.get('anioCirculacionMayor').value;
    let errores = control.get('anioCirculacionMenor').errors;
    if (!errores) {
      errores = null;
    }
    if (min > max) {
      if (errores)
        errores.rango = true;
      else
        errores = {rango: true};
    }
    else if (control.get('anioCirculacionMenor').hasError('rango')) {
      delete errores.rango;
      const keys = Object.keys(errores);
      if (keys.length <= 0)
        errores = null;
    }
    control.get('anioCirculacionMenor').setErrors(errores);
    return;
  }
}

export function validateRangoAniosCirculacion(control: AbstractControl): {[key: string]: boolean} | null {
  if (control && control.get('aniosCirculacionMenor') && control.get('aniosCirculacionMayor')) {
    const min = control.get('aniosCirculacionMenor').value;
    const max = control.get('aniosCirculacionMayor').value;
    let errores = control.get('aniosCirculacionMenor').errors;
    if (!errores) {
      errores = null;
    }
    if (min > max) {
      if (errores)
        errores.rango = true;
      else
        errores = {rango: true};
    }
    else if (control.get('aniosCirculacionMenor').hasError('rango')) {
      delete errores.rango;
      const keys = Object.keys(errores);
      if (keys.length <= 0)
        errores = null;
    }
    control.get('aniosCirculacionMenor').setErrors(errores);
    return;
  }
}

export function validateRangoValorVehiculo(control: AbstractControl): {[key: string]: boolean} | null {
  if (control && control.get('modoCobroVehiculoMenor') && control.get('modoCobroVehiculoMayor')
    && control.get('modoCobroVehiculoMayor').value && control.get('modoCobroVehiculoMenor').value) {
    const min = control.get('modoCobroVehiculoMenor').value;
    const max = control.get('modoCobroVehiculoMayor').value;
    let errores = control.get('modoCobroVehiculoMenor').errors;
    if (!errores) {
      errores = null;
    }
    if (min > max) {
      if (errores)
        errores.rango = true;
      else
        errores = {rango: true};
    }
    else if (control.get('modoCobroVehiculoMenor').hasError('rango')) {
      delete errores.rango;
      const keys = Object.keys(errores);
      if (keys.length <= 0)
        errores = null;
    }
    control.get('modoCobroVehiculoMenor').setErrors(errores);
    return;
  }
}

