/* -----------------------------------------
AUTOR: Victor Pinedo
EMPRESA: Asesoftware
REQUERIMIENTO: Sprint_01 - HU_1.7.03
FECHA CREACIÓN: Marzo 18 de 2021
------------------------------------------- */
import { Component, Input, OnInit } from '@angular/core';

import { SubSink } from 'subsink';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarioPagoService } from '@core/api/services';
import { MessageService } from '@core/services/message.service';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { flushMicrotasks } from '@angular/core/testing';

@Component({
  selector: 'app-calendario-eliminar',
  templateUrl: './calendario-eliminar.component.html',
  styleUrls: ['./calendario-eliminar.component.scss'],
})
export class CalendarioEliminarComponent implements OnInit {


  private subs = new SubSink();
  @Input() dataFromModalWindow: any;

  constructor(
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private calendarioPagoSvc: CalendarioPagoService,
    public dialogRef: MatDialogRef<VentanaModalComponent>
  ) {
  }

  public form = this.fb.group({
    id:             ['', [Validators.required]],
    observaciones:  ['', [Validators.required, Validators.maxLength(200)]],
  });

  get formControl() { return this.form.controls; }

  ngOnInit(): void {
    this.setearFormulario();
  }

  private setearFormulario(): void {
    const id = this.dataFromModalWindow.id;
    this.form.get('id').setValue(id);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formulario = this.form.value;
      this.subs.add(
        this.calendarioPagoSvc.deletePayCalendarUsingDELETE(formulario)
          .subscribe({
            next: data => {
													this.closeModal(true);
              this.messageSvc.exito('Registo eliminado exitosamente');
            },
            error: err => {
              this.messageSvc.errorToast(err);
            }
          })
      );
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

		onCloseDialog(flag : boolean): void {
			if (this.form.dirty) {
				const mensaje = {
					titulo: 'Eliminar calendario de pago',
					cuerpo: '¿Desea salir sin guardar los cambios?'
			}
				this.messageSvc.confirmar(mensaje)
				.then((result) => {
					if (result.isConfirmed) {
						this.closeModal(flag);
					}
				});
			} else {
				this.closeModal(flag);
			}
		}

		closeModal(flag: boolean): void {
			this.dialogRef.close(flag);
		}

}
