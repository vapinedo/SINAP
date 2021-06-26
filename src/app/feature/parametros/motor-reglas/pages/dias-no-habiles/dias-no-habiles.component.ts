import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BusinessDay } from '@core/api/models/business-day';
import { DiasHabilesService } from '@core/api/services';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '@core/services/spinner.service';

@Component({
  selector: 'app-dias-no-habiles',
  templateUrl: './dias-no-habiles.component.html',
  styleUrls: ['./dias-no-habiles.component.scss']
})
export class DiasNoHabilesComponent implements OnInit {

  public showSpinner = false;
  public showProgressBar = false;
  public validFrom = false;
  
  public backup: BusinessDay[] = [];
  public nonBusinessDays: BusinessDay[] = [];
  
  constructor(
    public dialog: MatDialog,
    public businessDayService: DiasHabilesService,
    private toastr: ToastrService,
    private spinner: SpinnerService
  ) {  }
  
  ngOnInit(): void {
    this.getNonBusinessDays();
  }

  changeCheckbox(event: any, index: number): void {
    this.nonBusinessDays[index].estado = event.checked ? '1' : '0';
  }

  validForm(): boolean {
    return this.nonBusinessDays.filter(x => x.estado === '1').length > 0 &&
      !(Object.keys(this.nonBusinessDays).length === Object.keys(this.backup).length
      && Object.keys(this.nonBusinessDays).every(p => this.nonBusinessDays[p].estado === this.backup[p].estado));
  }

  save(): void {
    this.spinner.show();
    this.businessDayService.saveNonBusinessDaysUsingPUT(this.nonBusinessDays)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.toastr.success('Actualización exitosa');
          this.getNonBusinessDays();
        },
        error: err => {
          this.toastr.error(err);
          this.spinner.hide()
        },
        complete: () => this.spinner.hide()
      })
  }

  cancel(): void {
    this.nonBusinessDays = JSON.parse(JSON.stringify(this.backup));
  }
  
  openDialog(): void {
    this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Actualizar días no hábiles',
					mensaje: '¿Desea guardar los cambios realizados?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.save();
				}
			});
  }

  getNonBusinessDays() {
    this.spinner.show()
    this.businessDayService.getNonBusinessDaysUsingGET().subscribe({
      next: data => {
        this.nonBusinessDays = [...data];
        this.backup = JSON.parse(JSON.stringify(data));
      },
      error: err => {
        this.toastr.error(err);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });;
  }

}
