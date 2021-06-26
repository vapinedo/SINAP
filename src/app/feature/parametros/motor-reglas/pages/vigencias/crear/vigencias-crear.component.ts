import { getFechaFinPeriodo } from '@core/utils/FunctionDates';
import { VigenciasValoresUnicos } from './../../../../../../core/api/models/vigencias-valores-unicos';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VigenciasCreate } from '@core/api/models';
import { VigenciasService } from '@core/api/services/vigencias.service';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vigencias-crear',
  templateUrl: './vigencias-crear.component.html',
  styleUrls: ['./vigencias-crear.component.scss']
})
export class VigenciasCrearComponent implements OnInit {

  @Input() dataFromModalWindow: any;
  
  public showSpinner = false;
  public lstPeriodos: any;
  public lstConceptos: any;

  vigenciaCreate: VigenciasCreate;
  vigenciaKeyUnique: VigenciasValoresUnicos;

  public form = this.fb.group({
    nombrePeriodo:   ['', [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.maxLength(100)]],
    fechaInicial:    ['', [Validators.required]],
    fechaFinal:      ['', [Validators.required]],
    tipoPeriodo:     ['', [Validators.required]],
    concepto:        [''],
    anual:           [''],
    estado:          ['', [Validators.required]]
  }); 
  
  constructor(  
              private fb: FormBuilder,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<VentanaModalComponent>,
              private vigenciasService: VigenciasService,
              private toastr: ToastrService) { }

    get formControls() {
      return this.form.controls;
    }

  ngOnInit(): void {
    this.form.controls.estado.setValue(true, { emitEvent: false});
    this.lstPeriodos = this.dataFromModalWindow.periodos;
    this.lstConceptos = this.dataFromModalWindow.conceptos;

    console.log('Form', this.form.value);

  }

  changes() {
    if(this.form.value.tipoPeriodo == 'PERAMNIS'){
      this.formControls.concepto.setValidators([Validators.required]);
    }else{
      this.formControls.concepto.clearValidators();
      this.formControls.concepto.updateValueAndValidity();
    }
	}

  onSubmit(): void {
    this.dialog
        .open(ConfirmationDialogComponent, {
            data: {
                titulo: 'Crear vigencia',
                mensaje: '¿Está seguro que quiere crear este período de vigencia?',
            },
        })
        .afterClosed()
        .subscribe((confirmado) => {
          if (confirmado) {
            if(this.form.valid) {
              this.vigenciaKeyUnique = {
                periodo : this.form.value.nombrePeriodo,
                fechaInicial: this.form.value.fechaInicial.format('YYYY-MM-DD'),
                tipoPeriodo: this.form.value.tipoPeriodo
              }   
              
              this.showSpinner = true;
              this.vigenciasService.getVigenciaByKeyUniqueUsingPOST( this.vigenciaKeyUnique)
              .subscribe({   
                next: data => {      
                  if(data.length == 0) {
                    this.guardarVigencia();
                  }else{
                    this.toastr.error('Ya existe una vigencia con la fecha incial, nombre y tipo de período seleccionados');
                  }
                },
                error: err => this.toastr.error('Ha ocurrido un error al crear el período de vigencia, por favor intente más tarde'),
                complete: () => this.showSpinner = false
              });
        
            }
          return;
        }
      });

  }

  guardarVigencia(){
    this.vigenciaCreate = {
      periodo : this.form.value.nombrePeriodo,
      fechaInicial : this.form.value.fechaInicial.format('YYYY-MM-DD'),
      fechaFinal : this.form.value.fechaFinal.format('YYYY-MM-DD'),        
      tipoPeriodo : this.form.value.tipoPeriodo,
      idParConcepto : this.form.value.concepto,
      seRepite : this.form.value.anual == '' ? '0' : '1',
      estado : this.form.value.estado == true ? 'A' : 'I',
    }    

    this.vigenciasService.saveVigenciaUsingPOST(this.vigenciaCreate) 
    .subscribe({
      next: () => { 
        this.dialogRef.close('Creado');
        this.toastr.success('Registro creado exitosamente!');
      }, 
      error: err => this.toastr.error(err),
      complete: () => this.showSpinner = false
    });  

  }

  confirmarSalir(){
    if (this.form.dirty) {
      this.dialog
      .open(ConfirmationDialogComponent, {
          data: {
              titulo: 'Crear vigencia',
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
