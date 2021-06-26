import { Salary } from '@core/api/models/salary';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalarioMinimoService } from '@core/api/services';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '@core/services/spinner.service';
import { Validators, FormBuilder } from '@angular/forms';
import { SUCCESS_UPDATE_SALARIO_MINIMO } from '@core/utils/Mensajes';

@Component({
  selector: 'app-salario-minimo',
  templateUrl: './salario-minimo.component.html',
  styleUrls: ['./salario-minimo.component.scss']
})
export class SalarioMinimoComponent implements OnInit {

  @Output() redirectTypeCalendar: EventEmitter<any> = new EventEmitter();

  public showSpinner = false;
  public years: number[] = [];
  
  public backup: Salary;
  public data: Salary;

  public form = this.fb.group({
    periodo:   ['', [Validators.required]],
    valor:    ['', [
      Validators.required,
      Validators.max(99999999999999999999999),
      Validators.min(0)]],
  }); 
  
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public salaryService: SalarioMinimoService,
    private toastr: ToastrService,
    private spinner: SpinnerService
  ) {  }

  get formControl() {return this.form.controls;};
  
  ngOnInit(): void {
    const actualYear = new Date().getFullYear();
    for (let i = actualYear; i >= actualYear-3; i--) {
      this.years.push(i);
    }
  }

  onlyNumber(e: any): boolean {
    if (e)
      return ((e.keyCode > 95 && e.keyCode < 106  && e.keyCode != 101)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8 || e.code == 'Comma' || e.keyCode == 188);
  }

  validForm(): boolean {
    this.createEntity();
    if (this.data && this.backup)
      return this.form.valid &&
        !(Object.keys(this.data).length === Object.keys(this.backup).length
        && Object.keys(this.data).every(p => this.data[p] === this.backup[p]));
    
    return this.form.valid;
  }

  createEntity(): void {
    this.data = {
      periodo: this.form.value.periodo,
      valor: this.form.value.valor
    };
  }

  save(): void {
    this.spinner.show();
    this.createEntity();
    this.salaryService.updateSalaryForPeriodUsingPUT(this.data)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.toastr.success(SUCCESS_UPDATE_SALARIO_MINIMO);
          this.redirectTypeCalendar.emit(new Date());
        },
        error: err => {
          this.toastr.error(err);
          this.spinner.hide()
        },
        complete: () => this.spinner.hide()
      });
  }

  cancel(): void {
    this.data = JSON.parse(JSON.stringify(this.backup));
    this.form.patchValue({...this.data}, { emitEvent: false } );
  }
  
  openDialog(): void {
    this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Cambio salario mínimo',
					mensaje: '¿Está seguro que quiere cambiar salario mínimo para el año seleccionado?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.save();
				}
			});
  }

  get(period: number) {
    this.spinner.show()
    this.salaryService.getSalaryForPeriodUsingGET(period).subscribe({
      next: data => {
        if (data) {
          this.form.patchValue({...data}, { emitEvent: false } );
          this.data = {
            periodo: data.periodo,
            valor: data.valor
          };
          this.backup = JSON.parse(JSON.stringify(this.data));
        } else {
          this.form.controls.valor.reset();
        }
      },
      error: err => {
        this.toastr.error(err);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }


}
