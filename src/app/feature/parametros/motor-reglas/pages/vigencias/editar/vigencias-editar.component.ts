import { ConfirmationDialogComponent } from './../../../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { VigenciasUpdate } from './../../../../../../core/api/models/vigencias-update';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VigenciasService } from '@core/api/services';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { VigenciasValoresUnicos } from '@core/api/models';
import { VigenciasEliminarComponent } from '../eliminar/vigencias-eliminar.component';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-vigencias-editar',
  templateUrl: './vigencias-editar.component.html',
  styleUrls: ['./vigencias-editar.component.scss']
})
export class VigenciasEditarComponent implements OnInit {

  @Input() dataFromModalWindow: any;


  public showSpinner = false;
  changeForm = false;

  public lstPeriodos: any;
  public lstConceptos: any;
  public vigencia: VigenciasUpdate;
  vigenciaKeyUnique: VigenciasValoresUnicos;


  public form = this.fb.group({
    periodo:   ['', [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.maxLength(100)]],
    fechaInicial:    ['', [Validators.required]],
    fechaFinal:      ['', [Validators.required]],
    tipoPeriodo:       [''],
    conceptoId:       [''],
    seRepite:   [''],
    estado:           ['', [Validators.required]],
    observaciones:           ['', [Validators.required, Validators.maxLength(500)]]
  }); 

  constructor(private fb: FormBuilder,
               public dialog: MatDialog,
               private vigenciasService: VigenciasService,
               public dialogRef: MatDialogRef<VentanaModalComponent>,
               private toastr: ToastrService

    ) { }


  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.lstPeriodos = this.dataFromModalWindow.periodos;
    this.vigencia = this.dataFromModalWindow.item;
    this.lstPeriodos = this.dataFromModalWindow.periodos;
    this.lstConceptos = this.dataFromModalWindow.conceptos;
    console.log('Vigencia::', this.vigencia);
    this.setearFormulario(this.vigencia);

  }

  setearFormulario(data: any): void {
    data.seRepite = data.seRepite == '1' ? true : false;

    this.form.patchValue({...data}, { emitEvent: false } );

    this.formControls.fechaInicial.setValue(
      moment(data.fechaInicial, 'YYYY-MM-DD')
    );
    this.formControls.fechaFinal.setValue(
      moment(data.fechaFinal, 'YYYY-MM-DD')
    );

    this.changes();



  } 

  onSubmit(): void {
    this.dialog
    .open(ConfirmationDialogComponent, {
        data: {
            titulo: 'Editar vigencia',
            mensaje: '¿Está seguro que quiere modificar esta vigencia?',
        },
    })
    .afterClosed()
    .subscribe((confirmado) => {
      if (confirmado){

      this.vigenciaKeyUnique = {
        periodo : this.form.value.nombrePeriodo,
        fechaInicial: this.form.value.fechaInicial.format('YYYY-MM-DD'),
        tipoPeriodo: this.form.value.tipoPeriodo
      }   
      
      this.showSpinner = true;
      this.vigenciasService.getVigenciaByKeyUniqueUsingPOST( this.vigenciaKeyUnique)
      .subscribe({   
        next: data => {      
          if(data.length == 0 || (data.find( ele => ele.idVigencia == this.vigencia.idVigencia) )) {
            this.updateVigencia();
          }else{
            this.toastr.error('Ya existe una vigencia con la fecha incial, nombre y tipo de período seleccionados');
          }
        },
        error: err => this.toastr.error('Ha ocurrido un error al crear el período de vigencia, por favor intente más tarde'),
        complete: () => this.showSpinner = false
      });
      
    }
  });
        
  }


  updateVigencia(){
    this.vigencia.periodo = this.form.value.periodo;
    this.vigencia.fechaInicial = this.form.value.fechaInicial?.format('YYYY-MM-DD');
    this.vigencia.fechaFinal = this.form.value.fechaFinal?.format('YYYY-MM-DD');        
    this.vigencia.tipoPeriodo = this.form.value.tipoPeriodo;
    this.vigencia.idParConcepto = this.form.value.conceptoId;
    this.vigencia.seRepite = this.form.value.seRepite == '' ? '0' : '1';
    this.vigencia.estado = this.form.value.estado == true ? 'A' : 'I';
    this.vigencia.observaciones = this.form.value.observaciones;
  

    this.vigenciasService.updateVigenciaUsingPUT(this.vigencia) 
    .subscribe({
      next: () => { 
        this.dialogRef.close();
        this.toastr.success('Registro actualizado exitosamente!');
      }, 
      error: err => this.toastr.error(err),
      complete: () => this.showSpinner = false
    });  
  }


  onDelete() {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '45vw',
      disableClose: true,
      data: { 
        dataComponent: {
          data:  this.vigencia,
          title: 'Eliminar vigencia'
        },
        component: VigenciasEliminarComponent
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

  changes() {
    if(this.formControls.tipoPeriodo.value == 'PERAMNIS'){
      this.formControls.conceptoId.setValidators([Validators.required]);    
    }else{
      this.formControls.conceptoId.clearValidators();
    }
    this.formControls.conceptoId.updateValueAndValidity({ emitEvent: false });


	}

  confirmarSalir(){
    if (this.form.dirty) {
      this.dialog
      .open(ConfirmationDialogComponent, {
          data: {
              titulo: 'Editar vigencia',
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

}
