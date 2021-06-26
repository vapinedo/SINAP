import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiaAdicionalService } from '@core/api/services';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '@core/services/spinner.service';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { SOLO_NUMEROS } from '@core/utils/Patterns';
import { AdditionalDay } from '@core/api/models/additional-day';
import { default as _rollupMoment } from 'moment';
import * as _moment from 'moment';
import { SUCCESS_UPDATE_DIAS_ADICIONALES } from '@core/utils/Mensajes';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-dias-adicionales',
  templateUrl: './dias-adicionales.component.html',
  styleUrls: ['./dias-adicionales.component.scss']
})
export class DiasAdicionalesComponent implements OnInit {

  @Output() redirectTypeCalendar: EventEmitter<any> = new EventEmitter();

  public showSpinner = false;
  
  public backup: AdditionalDay = null;
  public data: AdditionalDay = null;
  public getDone = false;
  public minDate: any;

  public form = this.fb.group({
    fechaInicial:   [''],
    fechaFinal:   [''],
    fechaInicioConteo:   ['', Validators.required],
    diasAdicionales:    [0, [
      Validators.required,
      Validators.pattern(SOLO_NUMEROS),
      Validators.max(99999),
      Validators.min(0)]],
  }); 
  
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public additionalDayService: DiaAdicionalService,
    private toastr: ToastrService,
    private spinner: SpinnerService
  ) {  }

  get formControl() {return this.form.controls;};
  
  ngOnInit(): void {
    this.get();
  }

  onlyNumber(e: any): boolean {
    if (e)
      return ((e.keyCode > 95 && e.keyCode < 106  && e.keyCode != 101)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8);
  }

  validForm(): boolean {
    this.createEntity();
    return this.form.valid
      && ((this.form.controls.fechaInicial?.value && this.form.controls.fechaFinal?.value)
      || (!this.form.controls.fechaInicial?.value && !this.form.controls.fechaFinal?.value))
      && !(Object.keys(this.data || {})?.length === Object.keys(this.backup || {})?.length
      && Object.keys(this.data).every(p => this.data[p] === this.backup[p]));
  }

  validatorDates(): void {
    if (this.form.controls.fechaInicial?.value && this.form.controls.fechaFinal?.value) {
      this.form.controls.fechaInicioConteo.enable();
    } else {
      this.form.controls.fechaInicioConteo.disable();
    }
    if (this.form.controls.fechaFinal?.value) {
      this.minDate = moment(this.form.controls.fechaFinal?.value).add(1, 'd');
    }
  }

  save(): void {
    this.spinner.show();
    this.createEntity();
    this.additionalDayService.createAdditionalDayUsingPOST(this.data)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.toastr.success(SUCCESS_UPDATE_DIAS_ADICIONALES);
          this.redirectTypeCalendar.emit(new Date());
        },
        error: err => {
          this.toastr.error(err);
          this.spinner.hide()
        },
        complete: () => this.spinner.hide()
      });
  }

  clearDate(formControlName: FormControl): void {
    if (formControlName.value !== "") {
      formControlName.setValue('');
      this.form.controls.fechaInicioConteo.reset();
    }
  }

  createEntity(): void {
    this.data = {
      diasAdicionales: this.form.value.diasAdicionales,
      fechaFinal: this.form.controls.fechaFinal.value? 
        this.form.controls.fechaFinal.value.format('YYYY-MM-DD') : null,
      fechaInicial: this.form.controls.fechaInicial.value? 
        this.form.controls.fechaInicial.value.format('YYYY-MM-DD') : null,
      fechaInicioConteo: this.form.controls.fechaInicioConteo.value? 
        this.form.controls.fechaInicioConteo.value.format('YYYY-MM-DD') : null,
    };
  }

  cancel(): void {
    this.data = JSON.parse(JSON.stringify(this.backup));
    this.form.patchValue({...this.data}, { emitEvent: false } );
    this.form.controls.fechaInicial.setValue(
      this.data?.fechaInicial ? moment(this.data?.fechaInicial, 'YYYY-MM-DD') : null);
    this.form.controls.fechaFinal.setValue(
      this.data?.fechaFinal ? moment(this.data?.fechaFinal, 'YYYY-MM-DD') : null);
    this.form.controls.fechaInicioConteo.setValue(
      this.data?.fechaInicioConteo ? moment(this.data?.fechaInicioConteo, 'YYYY-MM-DD') : null);
      this.form.controls.diasAdicionales.setValue(
        this.data.diasAdicionales || 0);
  }
  
  openDialog(): void {
    this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Cambio días adicionales',
					mensaje: '¿Está seguro que quiere actualizar los días adicionales?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.save();
				}
			});
  }

  get(): void {
    this.spinner.show();
    this.data = null;
    this.backup = null;
    this.additionalDayService.getByEstadoAdditionalDayUsingGET().subscribe({
      next: data => {
        if (data) {
          this.form.patchValue({...data}, { emitEvent: false } );
          this.form.controls.fechaInicial.setValue(
            data.fechaInicial ? moment(data.fechaInicial, 'YYYY-MM-DD') : null);
          this.form.controls.fechaFinal.setValue(
            data.fechaFinal ? moment(data.fechaFinal, 'YYYY-MM-DD') : null);
          this.form.controls.fechaInicioConteo.setValue(
            data.fechaInicioConteo ? moment(data.fechaInicioConteo, 'YYYY-MM-DD') : null);
          this.form.controls.diasAdicionales.setValue(
            data.diasAdicionales || 0);
          this.data = {
            diasAdicionales: data.diasAdicionales || 0,
            fechaFinal: this.form.controls.fechaFinal.value?.format('YYYY-MM-DD') || null,
            fechaInicial: this.form.controls.fechaInicial.value?.format('YYYY-MM-DD') || null,
            fechaInicioConteo: this.form.controls.fechaInicioConteo.value?.format('YYYY-MM-DD') || null,
          };
          this.backup = JSON.parse(JSON.stringify(this.data));
          this.validatorDates();
        }
        this.getDone = true;
      },
      error: err => {
        this.getDone = true;
        this.toastr.error(err);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

}
