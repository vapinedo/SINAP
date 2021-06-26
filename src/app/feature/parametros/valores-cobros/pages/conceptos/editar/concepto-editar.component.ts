import { Component, Input, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { DatosDePruebaService } from '@core/services/datos-de-prueba.service';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { ConceptoService } from '@core/api/services';
import { ConceptoEliminarComponent } from '../eliminar/concepto-eliminar.component';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { ConceptoUpdate } from '@core/api/models';
import { ToastrService } from 'ngx-toastr';
import { compareDate } from '@core/utils/FunctionDates';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-concepto-editar',
  templateUrl: './concepto-editar.component.html',
  styleUrls: ['./concepto-editar.component.scss']
})
export class ConceptoEditarComponent implements OnInit {

  @Input() dataFromModalWindow: any;

  public showSpinner = false;
  private subscription1 = new Subscription();

  normatives: any[];
  public lstCobroMulta: any;
  public lstRegistral: any;
  changeForm = false;
  concepto: ConceptoUpdate;
  cobraMultaAnt:any;

  public form = this.fb.group({
    nombre:   ['', [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.maxLength(100)]],
    idNormativa:        [''],
    descripcion:      ['', [Validators.maxLength(500)]],
    cobraMulta:       ['', [Validators.required]],
    codigo:   ['', [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.maxLength(10)]],
    estado:           ['', [Validators.required]],
    observaciones:           ['', [Validators.required, Validators.maxLength(500)]],
    registral:       ['', [Validators.required]],
    inicioVigencia: ['', [Validators.required]],
    finVigencia: [''],
  }); 

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
    private filtrosTablaService: FiltrosTablaService,
    private conceptoDebitoSvc: ConceptoService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { } 

  get nombre() { return this.form.get('nombre'); }  
  get idNormativa() { return this.form.get('idNormativa'); }  
  get descripcion() { return this.form.get('descripcion'); }  
  get cobraMulta() { return this.form.get('cobraMulta'); }  
  get codigo() { return this.form.get('codigo'); }  
  get estado() { return this.form.get('estado'); }  
  get observaciones() { return this.form.get('observaciones'); }  
  get registral() { return this.form.get('registral'); }  
  get inicioVigencia() { return this.form.get('inicioVigencia'); } 
  get finVigencia() { return this.form.get('finVigencia'); } 

  ngOnInit(): void {
    this.listenerChanges();
    this.concepto = this.dataFromModalWindow.item;
    this.normatives = this.dataFromModalWindow.normatives;

    this.lstCobroMulta = this.filtrosTablaService.cobroMulta();
    this.lstRegistral= this.filtrosTablaService.cobroMulta();
    this.setearFormulario(this.concepto);
    this.cobraMultaAnt=this.concepto.cobraMulta;
  }

  setearFormulario(data: any): void {
    this.form.patchValue({...data}, { emitEvent: false } );
    this.form.controls.inicioVigencia.setValue(
      moment(data.fechaInicioVigencia, 'YYYY-MM-DD')
    );
    if(data.fechaFinVigencia){
      this.form.controls.finVigencia.setValue(
        moment(data.fechaFinVigencia, 'YYYY-MM-DD')
      );
    }
  } 

  onSubmit(): void {
    this.dialog
        .open(ConfirmationDialogComponent, {
            data: {
                titulo: 'Editar concepto de débito',
                mensaje: '¿Está seguro que quiere modificar este concepto?',
            },
        })
        .afterClosed()
        .subscribe((confirmado) => {
          if (confirmado){
            if (this.form.valid) {
              const params: ConceptoService.GetConceptByKeyUniqueUsingGETParams = {
                typology : 'CONDEB',
                code : this.form.value.codigo,
                idNormative : this.form.value.idNormativa
              }
              this.showSpinner = true;
              this.conceptoDebitoSvc.getConceptByKeyUniqueUsingGET(params)
              .subscribe({   
                next: data => {
                  console.log('Data edit', data);
                  if(data.length == 0 || (data.find( ele => ele.id == this.concepto.id) )) {
        
                    this.concepto.nombre = this.form.value.nombre;
                    this.concepto.descripcion = this.form.value.descripcion;
                    this.concepto.cobraMulta = this.form.value.cobraMulta;
                    this.concepto.estado = this.form.value.estado == true ? 'A' : 'I';
                    this.concepto.codigo = this.form.value.codigo;
                    this.concepto.observaciones = this.form.value.observaciones;
                    this.concepto.idNormativa = this.form.value.idNormativa;
                    this.concepto.registral =this.form.value.registral;
                    this.concepto.fechaInicioVigencia =this.form.value.inicioVigencia;
                    this.concepto.fechaFinVigencia =this.form.value.finVigencia;
                    this.conceptoDebitoSvc.updateUsingPUTResponse(this.concepto) 
                    .subscribe({
                      next: () => { 
                        this.dialogRef.close('Edicion');
                        if(this.cobraMultaAnt =='0' && this.concepto.cobraMulta =='1'){
                           this.toastr.success('Recuerde parametrizar la multa correspondiente');
                        }
                        this.toastr.success('Registro actualizado exitosamente!');
                      }, 
                      error: err => this.toastr.error(err),
                      complete: () => this.showSpinner = false
                    }); 
        
                  }else{
                    this.toastr.error('Ya existe un concepto con el código y normativa seleccionada');
                  }
                },
                error: err => this.toastr.error(err),
                complete: () => this.showSpinner = false
              });
            }
            return;
          }
        });
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
  } 

  onDelete() {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '45vw',
      disableClose: true,
      data: { 
        dataComponent: {
          data:  this.concepto,
          title: 'Editar concepto de débito'
        },
        component: ConceptoEliminarComponent
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`Dialog result delete: ${result}`);
        if(result == 'Eliminado'){
          this.dialogRef.close();
        }       
      });
  }

  listenerChanges(){
    this.form.controls.nombre.valueChanges.subscribe(() => {
      this.changeForm = true;
    });

    this.form.controls.idNormativa.valueChanges.subscribe(() => {
      this.changeForm = true;
    });

    this.form.controls.descripcion.valueChanges.subscribe(() => {
      this.changeForm = true;
    });

    this.form.controls.cobraMulta.valueChanges.subscribe(() => {
      this.changeForm = true;
    });

    this.form.controls.codigo.valueChanges.subscribe(() => {
      this.changeForm = true;
    });

    this.form.controls.estado.valueChanges.subscribe(() => {
      this.changeForm = true;
    });

    this.form.controls.registral.valueChanges.subscribe(() => {
      this.changeForm = true;
    });

    
    this.form.controls.finVigencia.valueChanges.subscribe(() => {
      this.changeForm = true;
    });



  }


  eventDates(type: string, event: MatDatepickerInputEvent<Date>) {
		this.validateDates();
	}

  validateDates(){
    const erroresFechaInicio = {};
		const erroresFechaFinal = {};
		let fechasInvalida = false;

    if (
			this.form.get("inicioVigencia").value &&
			this.form.get("finVigencia").value
		){      

      if (compareDate(this.form.get("finVigencia").value, this.form.get("inicioVigencia").value) == -1) {
				erroresFechaInicio['outRange1'] =
					'La fecha inicio debe ser menor a la fecha fin';
				fechasInvalida = true;
			} else {
        this.form.get("inicioVigencia").setErrors({ outRange1: null });
				this.form.get("inicioVigencia").updateValueAndValidity();
			}

      if (compareDate(this.form.get("inicioVigencia").value, this.form.get("finVigencia").value) == 1) {
        erroresFechaFinal['outRange1'] =
         'La fecha fin de vigencia debe ser mayor a la fecha inicio de vigencia';
        fechasInvalida = true;        
      } else {
        this.form.get("finVigencia").setErrors({ outRange1: null });
        this.form.get("finVigencia").updateValueAndValidity();
      }
  
   
      for (const key in erroresFechaInicio) {
        this.form.get("inicioVigencia").setErrors(erroresFechaInicio);
      }
  
      for (const key in erroresFechaFinal) {
        this.form.get("finVigencia").setErrors(erroresFechaFinal);
      }

    }   
  }
}
