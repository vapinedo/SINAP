import { Component, OnInit } from '@angular/core';

import { DomainService, NormativaService } from '@core/api/services';
import { Dominios } from '@core/models/Dominios';
import { ItemMenu } from '@core/api/models/item-menu';
import { NormativaCreateDTO } from '@core/api/models/normativa-create-dto';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';

import { MessageService } from '@core/services/message.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormatString } from '@core/utils/StringFuntion';
import { CREATE } from '@core/utils/Mensajes';
import { compareDate } from '@core/utils/FunctionDates';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  selector: 'app-normativa-crear',
  templateUrl: './normativa-crear.component.html',
  styleUrls: ['./normativa-crear.component.scss']
})
export class NormativaCrearComponent implements OnInit {

  public documentos: ItemMenu[] = [];
  public showSpinner = false;
 
  public form = this.fb.group({
    documento:    ['', [Validators.required]],
    nombre:   ['', [Validators.required,Validators.maxLength(350)]],
    descripcion:   ['', [Validators.maxLength(500)]],
    publicacion:      ['', [Validators.required]],
    estado:      ['', [Validators.required]],
    inicioVigencia:   ['', [Validators.required]],
    finVigencia:      [''],
  }); 



  constructor(
    private domainService: DomainService,
    private normativaService: NormativaService,
    private messageSvc: MessageService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDocumentos();
    this.form.controls.estado.setValue(true, { emitEvent: false});
  }


  getDocumentos(){
    this.domainService
    .getDomainsByIdUsingGET(Dominios.DOCUMENTO_NORMATIVA)
    .subscribe({
      next: (data) => {
        this.documentos = data;
      },
      error: (err) => {
        this.toastr.error(err|| ' No se ha logrado consultar el listado de documentos ' );
        this.showSpinner = false;
      }
    });
  }

  eventDates(type: string, event: MatDatepickerInputEvent<Date>) {
		this.validateDates();
	}

	validarFechas(): void {
  }

  get documento() { return this.form.get('documento'); }  
  get nombre() { return this.form.get('nombre'); }  
  get descripcion() { return this.form.get('descripcion'); }  
  get publicacion() { return this.form.get('publicacion'); }  
  get estado() { return this.form.get('estado'); }  
  get inicioVigencia() { return this.form.get('inicioVigencia'); }  
  get finVigencia() { return this.form.get('finVigencia'); }  
 


  
  onSubmit(): void {

  this.dialog
      .open(ConfirmationDialogComponent, {

        data: {
          titulo: 'Crear normativa',
          mensaje: '¿Está seguro que quiere crear esta normativa?',
        },
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
  

           if (this.form.valid) {
            this.showSpinner = true;
            let request = {} as NormativaCreateDTO;
            request.documento = this.form.get('documento').value;
            request.nombre = this.form.get('nombre').value;
            request.descripcion = this.form.get('descripcion').value;
            request.fechaPublicacion = this.form.get('publicacion').value;
            request.estado = this.form.get('estado').value == true ? 'A' : 'I';
            request.fechaInicioVigencia = this.form.get('inicioVigencia').value;
            request.fechaFinVigencia = this.form.get('finVigencia').value;

            console.log(request);

            this.normativaService.createNormativaUsingPOST(request)
              .subscribe({
                next: (data) => {
                
                  this.toastr.success(FormatString(CREATE, 'Normativa'));
                  this.dialogRef.close();
                },
                complete: () => (this.showSpinner = false),
                error: (err) => {
                  this.toastr.error(err);
                  this.showSpinner = false;
                },
              });
          }
          return;
        }
      });
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

  onCloseDialog(): void {
		if (this.form.dirty) {
			this.showConfirmarSalir();
		} else {
			this.dialogRef.close();
		}
	}

  showConfirmarSalir(): void {
		this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Creación incompleta',
					mensaje: '¿Desea salir sin guardar la información?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.dialogRef.close();
				}
			});
	}


}
