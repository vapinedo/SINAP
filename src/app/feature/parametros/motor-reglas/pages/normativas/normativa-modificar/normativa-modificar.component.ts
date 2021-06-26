import { Component,Inject, OnInit,Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemMenu } from '@core/api/models/item-menu';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { compareDate } from '@core/utils/FunctionDates';
import { SubSink } from 'subsink';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { FormatString } from '@core/utils/StringFuntion';

import { DomainService, NormativaService } from '@core/api/services';
import { Dominios } from '@core/models/Dominios';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { NormativaDeleteDTO, NormativaUpdateDTO } from '@core/api/models';
import { DELETE, UPDATE } from '@core/utils/Mensajes';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { NormativaEliminarComponent } from '../normativa-eliminar/normativa-eliminar.component';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-normativa-modificar',
  templateUrl: './normativa-modificar.component.html',
  styleUrls: ['./normativa-modificar.component.scss']
})
export class NormativaModificarComponent implements OnInit {


  public documentos: ItemMenu[] = [];
  public showSpinner = false;
  private subs = new SubSink();
  @Input() dataFromModalWindow: any;
 
  public form = this.fb.group({
    idNormativa:      [''],
    documento:    ['', [Validators.required]],
    nombre:  ['', [Validators.required,Validators.maxLength(350)]],
    descripcion:   ['', [Validators.maxLength(500)]],
    fechaPublicacion:      ['', [Validators.required]],
    estado:      ['', [Validators.required]],
    fechaInicioVigencia:   ['', [Validators.required]],
    fechaFinVigencia:      [''],
    observaciones:  ['', [Validators.maxLength(500)]],
    usuario: [''],
    fechaEdita: [''],

  }); 
  
  constructor(
    private domainService: DomainService,
    private normativaService: NormativaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) { }

  ngOnInit(): void {
    this.form.controls.usuario.setValue('User');
    this.form.controls.fechaEdita.setValue( new Date());
    
    this.getDocumentos();
    this.setForm();
  }

  get documento() { return this.form.get('documento'); }  
  get nombre() { return this.form.get('nombre'); }  
  get descripcion() { return this.form.get('descripcion'); }  
  get fechaPublicacion() { return this.form.get('fechaPublicacion'); }  
  get estado() { return this.form.get('estado'); }  
  get fechaInicioVigencia() { return this.form.get('fechaInicioVigencia'); }  
  get fechaFinVigencia() { return this.form.get('fechaFinVigencia'); } 
  get observaciones() { return this.form.get('observaciones'); }   
 

  getDocumentos(){
    this.domainService
    .getDomainsByIdUsingGET(Dominios.DOCUMENTO_NORMATIVA)
    .subscribe({
      next: (data) => {
        this.documentos = data;
      },
      error: err => {
        this.toastr.error('No se ha logrado consultar el listado de documentos ' || err);
        }
    });
  }

  private setForm(): void {
    const id = this.data;
    this.subs.add(
    this.normativaService.getDetailNormativaUsingGET(id)
    .subscribe({
          next: data => {
        
            this.form.patchValue({...data}, { emitEvent: false } );
            this.form.controls.estado.setValue(data.estado == 'A');
            this.form.controls.fechaInicioVigencia.setValue(
              moment(data.fechaInicioVigencia, 'YYYY-MM-DD')
            );
            if(data.fechaFinVigencia){
              this.form.controls.fechaFinVigencia.setValue(
                moment(data.fechaFinVigencia, 'YYYY-MM-DD')
              );
            }
            
          },
          error: err => {
            this.showSpinner = false;
            this.toastr.error(err);
          },
          complete: () => this.showSpinner = false
        })
    );

  } 
  
  eventDates(type: string, event: MatDatepickerInputEvent<Date>) {
		this.validateDates();
	}

  validateDates(){
    const erroresFechaInicio = {};
		const erroresFechaFinal = {};
		let fechasInvalida = false;

    if (
			this.form.get("inicioVigencia")?.value &&
			this.form.get("finVigencia")?.value
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


  onSubmit(): void {

    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          titulo: 'Editar normativa',
          mensaje: '¿Está seguro que quiere modificar esta normativa?',
        },
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {

          if (this.form.valid) {
            this.showSpinner = true;
            let request = {} as NormativaUpdateDTO;
            request.idNormativa =this.form.get('idNormativa').value;
            request.documento = this.form.get('documento').value;
            request.nombre = this.form.get('nombre').value;
            request.descripcion = this.form.get('descripcion').value;
            request.fechaPublicacion = this.form.get('fechaPublicacion').value;
            request.estado = this.form.get('estado').value == true ? 'A' : 'I';;
            request.fechaInicioVigencia = this.form.get('fechaInicioVigencia').value;
            request.fechaFinVigencia = this.form.get('fechaFinVigencia').value;
            request.observaciones = this.form.get('observaciones').value;
            console.log(request);

            this.normativaService.updateNormativaUsingPUT(request)
              .subscribe({
                next: (data) => {
                 this.toastr.success(FormatString(UPDATE, 'Normativa'));
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

  onDelete():void{
   const dialogEliminar =this.dialog
      .open(VentanaModalComponent, {
        data: {
          dataComponent: {
          title: 'Eliminar normativa',
          data: this.form.get('idNormativa').value,
          },
          component:NormativaEliminarComponent
        },
      });

      dialogEliminar.afterClosed()
      .subscribe(flag => {
        console.log(`Dialog result delete: ${flag}`);
        if(flag){
          this.dialogRef.close(true);
        }     
      });

    
    
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
					titulo: 'Modificación incompleta',
					mensaje: '¿Desea salir sin guardar los cambios?',
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
