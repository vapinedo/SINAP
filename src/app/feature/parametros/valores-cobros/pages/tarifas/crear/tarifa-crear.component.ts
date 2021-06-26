/* -----------------------------------------
AUTOR: Victor Pinedo
EMPRESA: Asesoftware
REQUERIMIENTO: Sprint_02 - HU_1.6.x
FECHA CREACIÓN: Marzo 19 de 2021
------------------------------------------- */
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '@core/services/message.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TarifasService } from '@core/api/services/tarifas.service';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { AsociarMunicipiosComponent } from '../municipios/asociar-municipios.component';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { Concepto, ItemMenu, PlateClassDTO, TarifasCreate, VariablesRecaudo, TarifasMunicipiosAsignar, ParametroCreateTarifa } from '@core/api/models';
import { NON_WHITE_SPACE_REG_EXP } from '@core/utils/Patterns';
import { DomainService } from '@core/api/services';
import { SOLO_NUMEROS_MONTO } from '@core/utils/Patterns';

@Component({
  selector: 'app-tarifa-crear',
  templateUrl: './tarifa-crear.component.html',
  styleUrls: ['./tarifa-crear.component.scss']
})
export class TarifaCrearComponent {

  @Input() dataFromModalWindow: any;

  private subs = new SubSink();
  public mostrarSpinner = false;
  public submit = false;
  public conceptos: Concepto[] = [];
  readonly dateFormat = 'YYYY-MM-DD';
  readonly SOLO_NUMEROS = '^[0-9]+$';
  readonly SOLO_NUMEROS_DIEZ = '^[0-9]{1,10}$';
  readonly SOLO_NUMEROS_ANNIOS = '^[0-9]{4}$';
  public parametrosAmostrar: string[] = [];

  public municipiosAsociados: TarifasMunicipiosAsignar[] = []; 

  public calcularImpuestoPorcentajeArr = ['PORCEN'];
  public calcularImpuestoMontoFijoArr = ['MONT_F'];
  public valoresEntre = ['ENTRE', 'ENT_E', 'ENT_I', 'P_TIEM', 'P_EXC', 'P_INC', 'E_INCL'];
  public valoresFijos = ['DIFER', 'MAYOR', 'MENOR', 'IGUAL', 'MAY_IG', 'MEN_IG'];
  public valorNoAplica = ['NO_APL'];
  
  // selects para poblar el formulario ( observables todos )
  public tipoPlaca$: Observable<PlateClassDTO[]>;
  public tipoVehiculo$: Observable<ItemMenu[]>;
  public tipoCombustible$: Observable<ItemMenu[]>;
  public cilindraje$: Observable<ItemMenu[]>;
  public anioVehiculo$: Observable<ItemMenu[]>;
  public anioInscripcion$: Observable<ItemMenu[]>;
  public anioCirculacion$: Observable<ItemMenu[]>;
  public aniosCirculacion$: Observable<ItemMenu[]>;
  public variablesRecaudo$: Observable<VariablesRecaudo[]>;
  public calcularImpuestoComo$: Observable<ItemMenu[]>;
  public conceptosDebitoAct$: Observable<ItemMenu[]>;
  public conceptosDebito$: Observable<Concepto[]>;
  public conceptoBase$: Observable<ItemMenu[]>;
  lstValorVehiculo: Observable<any[]>;

  isPlacaSelected = false;
  isTipoVehiculoSelected = false;
  isCombustibleSelected = false;
  isCilindrajeSelected = false;
  isAnnioVehiculoSelected = false;
  isAnnioInscripSelected = false;
  isAnnioCirculaSelected = false;
  isAnniosCirculaSelected = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private tarifasSvc: TarifasService,
    private messageSvc: MessageService,
    private filtroSvc: FiltrosTablaService,
    private domainSvc: DomainService,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
  ) { 
    this.mostrarSpinner = true;
    this.cargarListasDesplegables();
  } 

  private cargarListasDesplegables(): void {
    this.mostrarSpinner = true;
    this.filtroSvc.conceptoDebito()
      .subscribe(data => {
        this.conceptos = data
        this.mostrarSpinner = false;
      }, err => this.mostrarSpinner = false);
    this.tipoPlaca$ = this.filtroSvc.tipoPlaca();
    this.tipoVehiculo$ = this.filtroSvc.tipoVehiculo();
    this.tipoCombustible$ = this.filtroSvc.tipoCombustible();
    this.cilindraje$ = this.filtroSvc.cilindraje();
    this.anioVehiculo$ = this.filtroSvc.rangoDeTiempo();
    this.anioInscripcion$ = this.filtroSvc.rangoDeTiempo();
    this.anioCirculacion$ = this.filtroSvc.rangoDeTiempo();
    this.aniosCirculacion$ = this.filtroSvc.rangoDeTiempo();
    this.variablesRecaudo$ = this.filtroSvc.variablesRecaudo();
    this.calcularImpuestoComo$ = this.filtroSvc.calcularImpuestoComo();
    this.conceptoBase$ = this.filtroSvc.conceptoBase();
    this.conceptosDebitoAct$ = this.filtroSvc.conceptosDebitoActVigentes();
    this.lstValorVehiculo = this.domainSvc.getDomainsByIdUsingGET('ROPERADOR');
    this.filtroSvc.conceptosDebitoActVigentes().subscribe(console.log);
  }

  public form = this.fb.group({
    normativa:      [''],
    estado:         [true],
    concepto:       ['', [Validators.required]],

    calcularImpuestoComo:             ['', [Validators.required]],
    calcularImpuestoComoPorcentaje:   [{value: null, disabled: true}, [Validators.required, Validators.pattern(SOLO_NUMEROS_MONTO), 
                                        Validators.min(0), Validators.max(100)]],
    calcularImpuestoComoMontoMinimo:  [{value: null, disabled: true}, [Validators.required, Validators.pattern(SOLO_NUMEROS_MONTO), Validators.min(0)]],
    conceptosDebitoAct:               [{value: null, disabled: true}, [Validators.required]],
    modoCobroVehiculo:                [{value: null, disabled: true}, [Validators.required]],
    modoCobroVehiculoMayor:           [{value: '', disabled: true}, [Validators.required, Validators.pattern(SOLO_NUMEROS_MONTO)]],
    modoCobroVehiculoMenor:           [{value: '', disabled: true}, [Validators.required, Validators.pattern(SOLO_NUMEROS_MONTO)]],
    modoCobroVehiculoFijo:            [{value: '', disabled: true}, [Validators.required, Validators.pattern(SOLO_NUMEROS_MONTO)]],

    fechaInicial:   ['', [Validators.required]],
    fechaFinal:     ['', [Validators.required]],
    valorFijo:      [{value: '', disabled: true},[Validators.required, Validators.pattern(SOLO_NUMEROS_MONTO)]],
    nombre:         ['', [Validators.required, Validators.maxLength(100), Validators.pattern(NON_WHITE_SPACE_REG_EXP)]],
    descripcion:    ['', [Validators.maxLength(200), Validators.pattern(NON_WHITE_SPACE_REG_EXP)]],
    parametros: this.fb.group({
      tipoPlaca:            [{value: null, disabled: true}, [Validators.required]],
      tipoVehiculo:         [{value: null, disabled: true}, [Validators.required]],
      tipoCombustible:      [{value: null, disabled: true}, [Validators.required]],
  
      cilindraje:           [{value: null, disabled: true}, [Validators.required]],
      cilindrajeMayor:      [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_DIEZ)]],
      cilindrajeMenor:      [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_DIEZ)]],
      cilindrajeFijo:       [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_DIEZ)]],
  
      anioVehiculo:         [{value: null, disabled: true}, [Validators.required]],
      anioVehiculoMayor:    [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
      anioVehiculoMenor:    [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
      anioVehiculoFijo:     [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
  
      anioInscripcion:      [{value: null, disabled: true}, [Validators.required]],
      anioInscripcionFijo:  [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
      anioInscripcionMenor: [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
      anioInscripcionMayor: [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
  
      anioCirculacion:      [{value: null, disabled: true}, [Validators.required]],
      anioCirculacionFijo:  [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
      anioCirculacionMenor: [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
      anioCirculacionMayor: [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
  
      aniosCirculacion:     [{value: null, disabled: true}, [Validators.required]],
      aniosCirculacionFijo: [{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
      aniosCirculacionMenor:[{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]],
      aniosCirculacionMayor:[{value: null, disabled: true}, [Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]]
    }, {validators: [
      validateRangoCilindraje, 
      validateRangoAnioVehiculo,
      validateRangoAnioInscripcion,
      validateRangoAnioCirculacion,
      validateRangoAniosCirculacion]})
  }, {validators: validateRangoValorVehiculo}); 

  get formControl() { 
    return this.form.controls; 
  }

  onParametrosChange(parametros: string[]): void {
    this.parametrosAmostrar = parametros;
    this.loadParametros();
  }


  loadParametros(){
    this.isPlacaSelected = (this.parametrosAmostrar.find(x => x =='CLASE_PLACA')) ? true : false;
    this.isTipoVehiculoSelected = (this.parametrosAmostrar.find(x => x =='TIPO_VEHICULO')) ? true : false;
    this.isCombustibleSelected = (this.parametrosAmostrar.find(x => x =='TIPO_COMBUSTIBLE' )) ? true : false;
    this.isCilindrajeSelected = (this.parametrosAmostrar.find(x => x =='CILINDRAJE' )) ? true : false;
    this.isAnnioVehiculoSelected = (this.parametrosAmostrar.find(x => x =='ANNIO_VEHICULO' )) ? true : false;
    this.isAnnioInscripSelected = (this.parametrosAmostrar.find(x => x =='ANNIO_INSCRIPCION' )) ? true : false;
    this.isAnnioCirculaSelected = (this.parametrosAmostrar.find(x => x =='ANNIO_CIRCULACION' )) ? true : false;
    this.isAnniosCirculaSelected = (this.parametrosAmostrar.find(x => x =='ANNIOS_CIRCULACION' )) ? true : false;

    this.loadValidatorsParams();
  
  }

  
  loadValidatorsParams(){
    this.isPlacaSelected ? this.form.get('parametros').get('tipoPlaca').enable() :  (
      this.form.get('parametros').get('tipoPlaca')?.patchValue('', {emitEvent: false}),
      this.form.get('parametros').get('tipoPlaca').disable());
    this.isTipoVehiculoSelected ? this.form.get('parametros').get('tipoVehiculo').enable() :  (
      this.form.get('parametros').get('tipoVehiculo')?.patchValue('', {emitEvent: false}),
      this.form.get('parametros').get('tipoVehiculo').disable());
    this.isCombustibleSelected ? this.form.get('parametros').get('tipoCombustible').enable() :  (
      this.form.get('parametros').get('tipoCombustible')?.patchValue('', {emitEvent: false}),
      this.form.get('parametros').get('tipoCombustible').disable());

    this.isCilindrajeSelected ? this.form.get('parametros').get('cilindraje').enable() : 
    ( this.form.get('parametros').get('cilindraje').setValue(''), 
      this.form.get('parametros').get('cilindraje').disable(),
      this.changesCilindraje());
  
    this.isAnnioVehiculoSelected ? this.form.get('parametros').get('anioVehiculo').enable() : 
    ( this.form.get('parametros').get('anioVehiculo').setValue(''),
      this.form.get('parametros').get('anioVehiculo').disable(),
      this.changesAnioVehiculo());
      
    this.isAnnioInscripSelected ? this.form.get('parametros').get('anioInscripcion').enable() :
    ( this.form.get('parametros').get('anioInscripcion').setValue(''),
      this.form.get('parametros').get('anioInscripcion').disable(),
     this.changesAnioInscripcion());

    this.isAnnioCirculaSelected ? this.form.get('parametros').get('anioCirculacion').enable() : 
    ( this.form.get('parametros').get('anioCirculacion').setValue(''),
      this.form.get('parametros').get('anioCirculacion').disable(),
      this.changesAnioCirculacion());
      
    this.isAnniosCirculaSelected ? this.form.get('parametros').get('aniosCirculacion').enable() : 
    ( this.form.get('parametros').get('aniosCirculacion').setValue(''),
      this.form.get('parametros').get('aniosCirculacion').disable(),
      this.changesAniosCirculacion());
  }

  changesCilindraje(){
    if(this.valoresFijos.includes(this.form.get('parametros').get('cilindraje').value)){
      this.form.get('parametros').get('cilindrajeFijo').enable();
      this.form.get('parametros').get('cilindrajeMayor').disable();
      this.form.get('parametros').get('cilindrajeMenor').disable();
      this.form.get('parametros').get('cilindrajeMayor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('cilindrajeMenor')?.patchValue('', {emitEvent: false});
    } else if(this.valoresEntre.includes(this.form.get('parametros').get('cilindraje').value)){
      this.form.get('parametros').get('cilindrajeFijo').disable();
      this.form.get('parametros').get('cilindrajeFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('cilindrajeMayor').enable();
      this.form.get('parametros').get('cilindrajeMenor').enable();
    } else {
      this.form.get('parametros').get('cilindrajeFijo').disable();
      this.form.get('parametros').get('cilindrajeMayor').disable();
      this.form.get('parametros').get('cilindrajeMenor').disable();
      this.form.get('parametros').get('cilindrajeFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('cilindrajeMayor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('cilindrajeMenor')?.patchValue('', {emitEvent: false});
    }
  }

  changesAnioVehiculo(){
    if(this.valoresFijos.includes(this.form.get('parametros').get('anioVehiculo').value)){
      this.form.get('parametros').get('anioVehiculoFijo').enable();
      this.form.get('parametros').get('anioVehiculoMayor').disable();
      this.form.get('parametros').get('anioVehiculoMenor').disable();
      this.form.get('parametros').get('anioVehiculoMenor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioVehiculoMayor')?.patchValue('', {emitEvent: false});
    }else if(this.valoresEntre.includes(this.form.get('parametros').get('anioVehiculo').value)){
      this.form.get('parametros').get('anioVehiculoFijo').disable();
      this.form.get('parametros').get('anioVehiculoFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioVehiculoMayor').enable();
      this.form.get('parametros').get('anioVehiculoMenor').enable();
    } else {
      this.form.get('parametros').get('anioVehiculoFijo').disable();
      this.form.get('parametros').get('anioVehiculoMayor').disable();
      this.form.get('parametros').get('anioVehiculoMenor').disable();
      this.form.get('parametros').get('anioVehiculoFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioVehiculoMayor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioVehiculoMenor')?.patchValue('', {emitEvent: false});
    }
  }

  changesAnioInscripcion(){
    if(this.valoresFijos.includes(this.form.get('parametros').get('anioInscripcion').value)){
      this.form.get('parametros').get('anioInscripcionFijo').enable();
      this.form.get('parametros').get('anioInscripcionMayor').disable();
      this.form.get('parametros').get('anioInscripcionMenor').disable();
      this.form.get('parametros').get('anioInscripcionMayor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioInscripcionMenor')?.patchValue('', {emitEvent: false});
    }else if(this.valoresEntre.includes(this.form.get('parametros').get('anioInscripcion').value)){
      this.form.get('parametros').get('anioInscripcionFijo').disable();
      this.form.get('parametros').get('anioInscripcionFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioInscripcionMayor').enable();
      this.form.get('parametros').get('anioInscripcionMenor').enable();
    } else {
      this.form.get('parametros').get('anioInscripcionFijo').disable();
      this.form.get('parametros').get('anioInscripcionMayor').disable();
      this.form.get('parametros').get('anioInscripcionMenor').disable();
      this.form.get('parametros').get('anioInscripcionFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioInscripcionMayor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioInscripcionMenor')?.patchValue('', {emitEvent: false});
    }
  }

  changesAnioCirculacion(){
    if(this.valoresFijos.includes(this.form.get('parametros').get('anioCirculacion').value)){
      this.form.get('parametros').get('anioCirculacionFijo').enable();
      this.form.get('parametros').get('anioCirculacionMayor').disable();
      this.form.get('parametros').get('anioCirculacionMenor').disable();
      this.form.get('parametros').get('anioCirculacionMayor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioCirculacionMenor')?.patchValue('', {emitEvent: false});
    }else if(this.valoresEntre.includes(this.form.get('parametros').get('anioCirculacion').value)){
      this.form.get('parametros').get('anioCirculacionFijo').disable();
      this.form.get('parametros').get('anioCirculacionFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioCirculacionMayor').enable();
      this.form.get('parametros').get('anioCirculacionMenor').enable();
    } else {
      this.form.get('parametros').get('anioCirculacionFijo').disable();
      this.form.get('parametros').get('anioCirculacionMayor').disable();
      this.form.get('parametros').get('anioCirculacionMenor').disable();
      this.form.get('parametros').get('anioCirculacionFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioCirculacionMayor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('anioCirculacionMenor')?.patchValue('', {emitEvent: false});
    }
  }

  changesAniosCirculacion(){
    if(this.valoresFijos.includes(this.form.get('parametros').get('aniosCirculacion').value)){
      this.form.get('parametros').get('aniosCirculacionFijo').enable();
      this.form.get('parametros').get('aniosCirculacionMayor').disable();
      this.form.get('parametros').get('aniosCirculacionMenor').disable();
      this.form.get('parametros').get('aniosCirculacionMayor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('aniosCirculacionMenor')?.patchValue('', {emitEvent: false});
    }else if(this.valoresEntre.includes(this.form.get('parametros').get('aniosCirculacion').value)){
      this.form.get('parametros').get('aniosCirculacionFijo').disable();
      this.form.get('parametros').get('aniosCirculacionFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('aniosCirculacionMayor').enable();
      this.form.get('parametros').get('aniosCirculacionMenor').enable();
    } else {
      this.form.get('parametros').get('aniosCirculacionFijo').disable();
      this.form.get('parametros').get('aniosCirculacionMayor').disable();
      this.form.get('parametros').get('aniosCirculacionMenor').disable();
      this.form.get('parametros').get('aniosCirculacionFijo')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('aniosCirculacionMayor')?.patchValue('', {emitEvent: false});
      this.form.get('parametros').get('aniosCirculacionMenor')?.patchValue('', {emitEvent: false});
    }
  }

  changesValorVehiculo() {
    if(this.valoresFijos.includes(this.formControl.modoCobroVehiculo.value)){
      this.formControl.modoCobroVehiculoFijo.enable();
      this.formControl.modoCobroVehiculoMenor.disable();
      this.formControl.modoCobroVehiculoMayor.disable();
      this.formControl.modoCobroVehiculoMenor.patchValue('', {emitEvent: false});
      this.formControl.modoCobroVehiculoMayor.patchValue('', {emitEvent: false});
      
    }else if(this.valoresEntre.includes(this.formControl.modoCobroVehiculo.value)){
      this.formControl.modoCobroVehiculoFijo.disable();
      this.formControl.modoCobroVehiculoFijo.patchValue('', {emitEvent: false});
      this.formControl.modoCobroVehiculoMenor.enable();
      this.formControl.modoCobroVehiculoMayor.enable();
    } else {
      this.formControl.modoCobroVehiculoMenor.disable();
      this.formControl.modoCobroVehiculoMayor.disable();
      this.formControl.modoCobroVehiculoFijo.disable();
      this.formControl.modoCobroVehiculoMenor.patchValue('', {emitEvent: false});
      this.formControl.modoCobroVehiculoMayor.patchValue('', {emitEvent: false});
      this.formControl.modoCobroVehiculoFijo.patchValue('', {emitEvent: false});

    }
  }

  changesCalcularComo() {
    if(this.calcularImpuestoMontoFijoArr.includes(this.formControl.calcularImpuestoComo.value)){
      this.formControl.valorFijo.enable();
      this.formControl.calcularImpuestoComoMontoMinimo.disable();
      this.formControl.calcularImpuestoComoPorcentaje.disable();
      this.formControl.conceptosDebitoAct.disable();
      this.formControl.calcularImpuestoComoMontoMinimo.patchValue('', {emitEvent: false});
      this.formControl.calcularImpuestoComoPorcentaje.patchValue('', {emitEvent: false});
      this.formControl.conceptosDebitoAct.patchValue('', {emitEvent: false});

    }else if(this.calcularImpuestoPorcentajeArr.includes(this.formControl.calcularImpuestoComo.value)){
      this.formControl.valorFijo.disable();
      this.formControl.valorFijo.patchValue('', {emitEvent: false});
      this.formControl.calcularImpuestoComoMontoMinimo.enable();
      this.formControl.calcularImpuestoComoPorcentaje.enable();
      this.formControl.conceptosDebitoAct.enable();
    }
  }

  changesConceptoBase() {
    if(this.formControl.conceptosDebitoAct.value === 'V_VEHI'){
      this.formControl.modoCobroVehiculo.enable();
    } else {
      this.formControl.modoCobroVehiculo.setValue('');
      this.formControl.modoCobroVehiculo.disable();
      this.formControl.modoCobroVehiculoFijo.patchValue('', {emitEvent: false});
      this.formControl.modoCobroVehiculoMenor.patchValue('', {emitEvent: false});
      this.formControl.modoCobroVehiculoMayor.patchValue('', {emitEvent: false});
    }
  }

  onConceptoChange(idConcepto: number): void {
    console.log('change concepto', this.conceptos);
    console.log('change concepto valor', idConcepto);
    const normativa = this.conceptos.find(concepto => concepto.id == idConcepto);
    console.log('change concepto normativa', normativa);
    this.formControl.normativa.setValue(normativa?.normativa?.nombre);
  }

  onChangeValuesAnioCirculaVehi(){
    if(this.form.get('parametros').get('anioCirculacion').value && this.form.get('parametros').get('anioVehiculo').value){
      this.valVehiculoCirculacion();
    }else {
      this.form.get('parametros').get('anioCirculacionFijo').setValidators([Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);
      this.form.get('parametros').get('anioCirculacionFijo').updateValueAndValidity();   
      this.form.get('parametros').get('anioCirculacionMayor').setValidators([Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
      this.form.get('parametros').get('anioCirculacionMayor').updateValueAndValidity(); 
    }

    if(this.form.get('parametros').get('anioInscripcion').value && this.form.get('parametros').get('anioVehiculo').value){
      this.valVehiculoInscripcion();
    }else {
      this.form.get('parametros').get('anioInscripcionFijo').setValidators([Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
      this.form.get('parametros').get('anioInscripcionFijo').updateValueAndValidity();   
      this.form.get('parametros').get('anioInscripcionMayor').setValidators([Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS)]);   
      this.form.get('parametros').get('anioInscripcionMayor').updateValueAndValidity(); 
    }
  }

  valVehiculoCirculacion() {
    //Validar parejas
    if ((this.valoresFijos.includes(this.form.get('parametros').get('anioCirculacion').value) &&
      this.valoresFijos.includes(this.form.get('parametros').get('anioVehiculo').value) &&
      this.form.get('parametros').get('anioCirculacionFijo').value < this.form.get('parametros').get('anioVehiculoFijo').value)) {
      this.form.get('parametros').get('anioCirculacionFijo').setValidators([
        Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS),
        Validators.min(this.form.get('parametros').get('anioVehiculoFijo').value)]);
      this.form.get('parametros').get('anioCirculacionFijo').updateValueAndValidity();
    } else
      if ((this.valoresEntre.includes(this.form.get('parametros').get('anioCirculacion').value) &&
        this.valoresEntre.includes(this.form.get('parametros').get('anioVehiculo').value) &&
        this.form.get('parametros').get('anioCirculacionMayor').value < this.form.get('parametros').get('anioVehiculoMenor').value)) {
        this.form.get('parametros').get('anioCirculacionMayor').setValidators([
          Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS),
          Validators.min(this.form.get('parametros').get('anioVehiculoMenor').value)]);
        this.form.get('parametros').get('anioCirculacionMayor').updateValueAndValidity();
      } else
        if ((this.valoresFijos.includes(this.form.get('parametros').get('anioCirculacion').value) &&
          this.valoresEntre.includes(this.form.get('parametros').get('anioVehiculo').value) &&
          this.form.get('parametros').get('anioCirculacionFijo').value < this.form.get('parametros').get('anioVehiculoMenor').value)) {
          this.form.get('parametros').get('anioCirculacionFijo').setValidators([
            Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS),
            Validators.min(this.form.get('parametros').get('anioVehiculoMenor').value)]);
          this.form.get('parametros').get('anioCirculacionFijo').updateValueAndValidity();
        }

    if ((this.valoresEntre.includes(this.form.get('parametros').get('anioCirculacion').value) &&
      this.valoresFijos.includes(this.form.get('parametros').get('anioVehiculo').value) &&
      this.form.get('parametros').get('anioCirculacionMayor').value < this.form.get('parametros').get('anioVehiculoFijo').value)) {
      this.form.get('parametros').get('anioCirculacionMayor').setValidators([
        Validators.required, Validators.pattern(this.SOLO_NUMEROS_ANNIOS),
        Validators.min(this.form.get('parametros').get('anioVehiculoFijo').value)]);
      this.form.get('parametros').get('anioCirculacionMayor').updateValueAndValidity();
    }
  }

  valVehiculoInscripcion() {
    //Validar parejas
    if ((this.valoresFijos.includes(this.form.get('parametros').get('anioInscripcion').value) &&
      this.valoresFijos.includes(this.form.get('parametros').get('anioVehiculo').value) &&
      this.form.get('parametros').get('anioInscripcionFijo').value < this.form.get('parametros').get('anioVehiculoFijo').value)) {
      this.form.get('parametros').get('anioInscripcionFijo').setValidators([Validators.min(this.form.get('parametros').get('anioVehiculoFijo').value)]);
      this.form.get('parametros').get('anioInscripcionFijo').updateValueAndValidity();
    } else
      if ((this.valoresEntre.includes(this.form.get('parametros').get('anioInscripcion').value) &&
          this.valoresEntre.includes(this.form.get('parametros').get('anioVehiculo').value) &&
          this.form.get('parametros').get('anioInscripcionMayor').value < this.form.get('parametros').get('anioVehiculoMenor').value)) {
          this.form.get('parametros').get('anioInscripcionMayor').setValidators([Validators.min(this.form.get('parametros').get('anioVehiculoMenor').value)]);
          this.form.get('parametros').get('anioInscripcionMayor').updateValueAndValidity();
      } else
        if ((this.valoresFijos.includes(this.form.get('parametros').get('anioInscripcion').value) &&
          this.valoresEntre.includes(this.form.get('parametros').get('anioVehiculo').value) &&
          this.form.get('parametros').get('anioInscripcionFijo').value < this.form.get('parametros').get('anioVehiculoMenor').value)) {
          this.form.get('parametros').get('anioInscripcionFijo').setValidators([Validators.min(this.form.get('parametros').get('anioVehiculoMenor').value)]);
          this.form.get('parametros').get('anioInscripcionFijo').updateValueAndValidity();
      }

    if ((this.valoresEntre.includes(this.form.get('parametros').get('anioInscripcion').value) &&
      this.valoresFijos.includes(this.form.get('parametros').get('anioVehiculo').value) &&
      this.form.get('parametros').get('anioInscripcionMayor').value < this.form.get('parametros').get('anioVehiculoFijo').value)) {
      this.form.get('parametros').get('anioInscripcionMayor').setValidators([Validators.min(this.form.get('parametros').get('anioVehiculoFijo').value)]);
      this.form.get('parametros').get('anioInscripcionMayor').updateValueAndValidity();
    }
  }

  onAsociarMunicipios(): void {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '55vw',
      disableClose: true,
      data: { 
        dataComponent: { title: 'Asociar municipios', municipios: this.municipiosAsociados },
        component: AsociarMunicipiosComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(municipios => {
          if (municipios) {
            this.municipiosAsociados = municipios;
          }
        })
    )
  }  

  onSubmit(): void {
    this.submit = true;
    if (this.form.valid && this.municipiosAsociados.length > 0) {
      const mensaje = {
        titulo: 'Crear tarifa por concepto de débito',
        cuerpo: '¿Está seguro que quiere crear esta tarifa?'
      }
      this.messageSvc.confirmar(mensaje)
      .then(dialog => {
        if (dialog.isConfirmed) {
          const nuevaTarifa = this._prepararDatosAntesDeEnviar(this.form.value);
          this._enviarFormulario(nuevaTarifa);
        }
      });
      }
      return;
    }
    
  private _prepararDatosAntesDeEnviar(data: any): any {
    const nuevaTarifa: TarifasCreate = {
      "nombre": data?.nombre,
      "descripcion": data?.descripcion,
      "concepto": data?.concepto,
      "fechaInicial": this.formControl.fechaInicial.value.format(this.dateFormat),
      "fechaFinal": this.formControl.fechaFinal.value.format(this.dateFormat),
      "valorFijo": data?.valorFijo,
      "calcularImpuestoComo": data?.calcularImpuestoComo,
      "valorPorcentaje": data?.calcularImpuestoComoPorcentaje,
      "referenciaPorcentaje": data?.conceptosDebitoAct,
      "montoMinimo": data?.calcularImpuestoComoMontoMinimo,
      "estado": this.formControl.estado.value == true ? 'A' : 'I',
      "parametrosList": this._setearParametros(data?.parametros),
      "municipiosList": this.municipiosAsociados,
      "operValVehiculo": data?.modoCobroVehiculo,
      "valMinVehiculo": data?.modoCobroVehiculoFijo ? data?.modoCobroVehiculoFijo : data?.modoCobroVehiculoMenor,
      "valMaxVehiculo": data?.modoCobroVehiculoMayor
    };

    return nuevaTarifa;
  }

  private _setearParametros(parametros: any): ParametroCreateTarifa[] {
    const parametrosList = [];

    if (parametros?.tipoPlaca) {
      parametrosList.push({
        nombre: "CLASE_PLACA",
        dominio: null,
        valorMin: parametros?.tipoPlaca.clase, 
        operadorMin: 'IGUAL', 
        operadorMax: null, 
        valorDomino: parametros?.tipoPlaca.descripcion
      });      
    }
    if (parametros?.tipoVehiculo) {
      parametrosList.push({
        nombre: "TIPO_VEHICULO",
        dominio: null,
        valorDomino: parametros?.tipoVehiculo.label,
        valorMax: null,
        operadorMax: null,
        operadorMin: 'IGUAL', 
        valorMin: parametros?.tipoVehiculo.id 
      });      
    }
    if (parametros?.tipoCombustible) {
      parametrosList.push({
        nombre: "TIPO_COMBUSTIBLE",
        dominio: "TPCOMBUS",
        valorDomino: parametros?.tipoCombustible.label,
        operadorMin: "IGUAL",
        valorMin: parametros?.tipoCombustible.id,
        valorMax: null,
        operadorMax: null
      });      
    }
    if (parametros?.cilindraje) {
      parametrosList.push({ 
        nombre: "CILINDRAJE",
        dominio: null,
        valorDomino: null,
        operadorMin: parametros?.cilindraje,
        valorMin: parametros?.cilindrajeFijo ? parametros?.cilindrajeFijo : parametros?.cilindrajeMenor,
        operadorMax: parametros?.cilindrajeMayor ? parametros?.cilindraje : null,
        valorMax: parametros?.cilindrajeMayor
      });      
    }
    if (parametros?.anioVehiculo) {
      parametrosList.push({ 
        nombre: "ANNIO_VEHICULO",
        dominio: null,
        valorDomino: null,
        operadorMin: parametros?.anioVehiculo,
        valorMin: parametros?.anioVehiculoFijo ? parametros?.anioVehiculoFijo : parametros?.anioVehiculoMenor,
        operadorMax: parametros?.anioVehiculoMayor ? parametros?.anioVehiculo : null,
        valorMax: parametros?.anioVehiculoMayor
      });      
    }
    if (parametros?.anioInscripcion) {
      parametrosList.push({ 
        nombre: "ANNIO_INSCRIPCION",
        dominio: null,
        valorDomino: null,
        operadorMin: parametros?.anioInscripcion,
        valorMin: parametros?.anioInscripcionFijo ? parametros?.anioInscripcionFijo : parametros?.anioInscripcionMenor,
        operadorMax: parametros?.anioInscripcionMayor ? parametros?.anioInscripcion : null,
        valorMax: parametros?.anioInscripcionMayor,
      });      
    }
    if (parametros?.anioCirculacion) {
      parametrosList.push({ 
        nombre: "ANNIO_CIRCULACION",
        dominio: null,
        valorDomino: null,
        operadorMin: parametros?.anioCirculacion,
        valorMin: parametros?.anioCirculacionFijo ? parametros?.anioCirculacionFijo : parametros?.anioCirculacionMenor,
        operadorMax: parametros?.anioCirculacionMayor ? parametros?.anioCirculacion : null,
        valorMax: parametros?.anioCirculacionMayor,
      });      
    }
    if (parametros?.aniosCirculacion) {
      parametrosList.push({ 
        nombre: "ANNIOS_CIRCULACION",
        dominio: null,
        valorDomino: null,
        operadorMin: parametros?.aniosCirculacion,
        valorMin: parametros?.aniosCirculacionFijo ? parametros?.aniosCirculacionFijo : parametros?.aniosCirculacionMenor,
        operadorMax: parametros?.aniosCirculacionMayor ? parametros?.aniosCirculacion : null,
        valorMax: parametros?.aniosCirculacionMayor,
      });      
    }
    return parametrosList;
  }

  private _enviarFormulario(nuevaTarifa: TarifasCreate) {
    this.subs.add(
      this.tarifasSvc.createTarifaUsingPOST(nuevaTarifa)
        .subscribe({
          next: data => {
            this.dialogRef.close(true);
            this.messageSvc.exito('Registro creado exitosamente');
          },
          error: err => {
            this.messageSvc.errorToast(err);
          }
        })
    );
  }

  cancel(): void {
    if (this.form.dirty) {
      const mensaje = {
        titulo: 'Crear tarifa por concepto de débito',
        cuerpo: 'Algunos campos se encuentran diligenciados, ¿está seguro de salir sin guardar la información?'
      }
      this.messageSvc.confirmar(mensaje)
      .then(dialog => {
        if (dialog.isConfirmed) {
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

  onlyNumberMonto(e: any): boolean {
    if (e)
      return ((e.keyCode > 95 && e.keyCode < 106 && e.keyCode != 101)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8 || e.code == 'Comma' || e.keyCode == 188);
  }

  onlyNumber(e: any): boolean {
    if (e)
      return ((e.keyCode > 95 && e.keyCode < 106 && e.keyCode != 101)
        || (e.keyCode > 47 && e.keyCode < 58));
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
  if (control && control.get('modoCobroVehiculoMenor') && control.get('modoCobroVehiculoMayor')) {
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

