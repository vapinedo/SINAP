
import { Component, Input, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { ConceptoService } from '@core/api/services';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { ConceptoCreate } from '@core/api/models';
import { ToastrService } from 'ngx-toastr';
import { compareDate } from '@core/utils/FunctionDates';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-concepto-crear',
  templateUrl: './concepto-crear.component.html',
  styleUrls: ['./concepto-crear.component.scss']
})
export class ConceptoCrearComponent implements OnInit {

  @Input() dataFromModalWindow: any;

  public lstNormativa: any;
  public lstCobroMulta: any;
  public lstRegistral: any;
  public showSpinner = false;

  conceptDTO: ConceptoCreate;

  

  public form = this.fb.group({
    nombreConcepto:   ['', [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.maxLength(100)]],
    normativa:        [''],
    descripcion:      ['', [Validators.maxLength(500)]],
    cobroMulta:       ['', [Validators.required]],
    codigoConcepto:   ['', [Validators.required, Validators.pattern(new RegExp("\\S")), Validators.maxLength(10)]],
    estado:           ['', [Validators.required]],
    registral:       ['', [Validators.required]],
    inicioVigencia: ['', [Validators.required]],
    finVigencia: ['']
  }); 

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
    private conceptoDebitoSvc: ConceptoService,
    private filtrosTablaService: FiltrosTablaService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {} 

  get nombreConcepto() { return this.form.get('nombreConcepto'); }  
  get normativa() { return this.form.get('normativa'); }  
  get descripcion() { return this.form.get('descripcion'); }  
  get cobroMulta() { return this.form.get('cobroMulta'); }  
  get codigoConcepto() { return this.form.get('codigoConcepto'); }  
  get estado() { return this.form.get('estado'); }  
  get registral() { return this.form.get('registral'); }  
  get inicioVigencia() { return this.form.get('inicioVigencia'); } 
  get finVigencia() { return this.form.get('finVigencia'); } 


  ngOnInit(): void {
    this.form.controls.estado.setValue(true, { emitEvent: false});
    this.lstNormativa = this.dataFromModalWindow.data;
    this.lstCobroMulta = this.filtrosTablaService.cobroMulta();
    this.lstRegistral = this.filtrosTablaService.cobroMulta();

  }

  /**
   * Autor: Fabián Orozco
   * Empresa: Asesoftware
   * Requerimiento: Sprint_1 - HU_1.4.1
   * Fecha: 25/February/2021
   * Descripción: Creación
   */
  onSubmit(): void {
    this.dialog
        .open(ConfirmationDialogComponent, {
            data: {
                titulo: 'Crear concepto de débito',
                mensaje: '¿Está seguro que quiere crear este concepto de débito?',
            },
        })
        .afterClosed()
        .subscribe((confirmado) => {
          if (confirmado) {
            if(this.form.valid) {
              const params: ConceptoService.GetConceptByKeyUniqueUsingGETParams = {
                typology : 'CONDEB',
                code : this.form.value.codigoConcepto,
                idNormative : this.form.value.normativa
              }
              this.showSpinner = true;
              this.conceptoDebitoSvc.getConceptByKeyUniqueUsingGET(params)
              .subscribe({   
                next: data => {      
                  if(data.length == 0) {
                    this.conceptDTO = {
                      nombre : this.form.value.nombreConcepto,
                      descripcion : this.form.value.descripcion,
                      cobraMulta : this.form.value.cobroMulta,
                      estado : this.form.value.estado == true ? 'A' : 'I',
                      codigo : this.form.value.codigoConcepto,
                      tipologia : 'CONDEB',
                      idNormativa : this.form.value.normativa,
                      registral :this.form.value.registral,
                      fechaInicioVigencia :this.form.value.inicioVigencia,
                      fechaFinVigencia :this.form.value.finVigencia
                    }    
                  
                    this.conceptoDebitoSvc.saveUsingPOST(this.conceptDTO) 
                    .subscribe({
                      next: () => { 
                        this.dialogRef.close();
                        this.toastr.success('Registro creado exitosamente!');
                      }, 
                      error: err => this.toastr.error(err),
                      complete: () => this.showSpinner = false
                    });  
                  }else{
                    this.toastr.error('Ya existe un concepto con el código y normativa seleccionada');
                  }
                },
                error: err => this.toastr.error('Ha ocurrido un error al crear el concepto, por favor intente más tarde'),
                complete: () => this.showSpinner = false
              });
        
            }
          return;
        }
      });

  }

  cancel(){
    if (this.form.dirty) {
      this.dialog
      .open(ConfirmationDialogComponent, {
          data: {
              titulo: 'Crear concepto de débito',
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
