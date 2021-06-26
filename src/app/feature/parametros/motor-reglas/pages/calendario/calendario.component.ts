import { Parameter } from '@core/api/models/parameter';
import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '@core/api/models/item-menu';
import { ParParametroService, DomainService } from '@core/api/services';
import { PARAMETRO_TIPO_CALENDARIO, TIPO_CALENDARIO_DIA_CALENDARIO, TIPO_CALENDARIO_DIA_HABIL, DOMINIO_TIPO_CALENDARIO } from '@core/utils/Constants';
import { SpinnerService } from '@core/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UPDATE_G } from '@core/utils/Mensajes';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  panelOpenView = '';

  calendarType: ItemMenu[] = [];

  public calendarTypeSelected: Parameter;

  constructor(
    private parameterService: ParParametroService,
    private domainService: DomainService,
    private spinner: SpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {  }

  ngOnInit(): void {
    this.getCalendarType().add(() => {
      this.getCalendarTypeSelected();
    });
    
  }

  panelOpen(option: string): void {
    this.panelOpenView = option;
  }

  getCalendarType(): any {
    this.spinner.show();
    return this.domainService.getDomainsByIdUsingGET(DOMINIO_TIPO_CALENDARIO)
    .subscribe({
      next: data => {
        if (data) {
          this.calendarType = data;
        }
      },
      error: err => {
        this.toastr.error(err);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

  redirectTypeCalendar(): void {
    console.log('llama refesh');
    this.getCalendarTypeSelected();
  }

  getCalendarTypeSelected(): any {
    this.spinner.show();
    this.parameterService.getByIdParParameterUsingGET(PARAMETRO_TIPO_CALENDARIO)
    .subscribe({
      next: data => {
        if (data) {
          this.calendarTypeSelected = data;
          this.validateNonBusinessDays(this.calendarTypeSelected.valor);
        }
      },
      error: err => {
        this.toastr.error(err);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

  validateNonBusinessDays(id?: string): void {
    if (!id) {
      this.getCalendarTypeSelected();
    }
    if (id === TIPO_CALENDARIO_DIA_HABIL) {
      this.panelOpen('dias-no-habiles');
    }
    else if (id === TIPO_CALENDARIO_DIA_CALENDARIO) {
      this.panelOpen('calendario');
    }
  }

  openDialog(event: any, id: string): void {
    event.preventDefault();
    this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Cambio tipo de calendario',
					mensaje: '¿Está seguro que quiere cambiar el tipo de calendario?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.saveTipeCalendar(id);
				}
			});
  }

  saveTipeCalendar(id: string) {
    this.spinner.show();
    this.calendarTypeSelected.valor = id;
    this.parameterService.updateParParametroUsingPUT(this.calendarTypeSelected)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.toastr.success(UPDATE_G);
          this.getCalendarTypeSelected();
        },
        error: err => {
          this.toastr.error(err);
          this.spinner.hide()
        },
        complete: () => this.spinner.hide()
      });
  }


}
