import { Component, OnInit, Inject, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PayCalendarToDetail } from '@core/api/models/pay-calendar-to-detail';
import { CalendarioPagoService } from '@core/api/services/calendario-pago.service';

@Component({
  selector: 'app-calendario-pagos-detalle',
  templateUrl: './calendario-pagos-detalle.component.html',
  styleUrls: ['./calendario-pagos-detalle.component.scss']
})
export class CalendarioPagosDetalleComponent implements OnInit {

  @Input() dataFromModalWindow: any;

  private subscription = new Subscription();
  public showSpinner = false;

  constructor(
    private toastr: ToastrService,
    private calendarioPagoSvc: CalendarioPagoService,
    public dialogRef: MatDialogRef<CalendarioPagosDetalleComponent>
    ) { }

  public info: PayCalendarToDetail = null;

  ngOnInit(): void {
    this.getCalendarInfo();
  }

  getCalendarInfo() {
    this.showSpinner = true;
    let id = this.dataFromModalWindow.id;
    this.subscription = this.calendarioPagoSvc.findDetailByIdPayCalendarUsingGET(id)
    .subscribe({
      next: data => {
        this.info = data;
      },
      error: err => {
        this.toastr.error(err || 'No se ha logrado consultar el detalle del calendario de pago seleccionado');
        this.showSpinner = false;
      },
      complete: () => this.showSpinner = false
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModalEvent(){
    this.dialogRef.close( this.dataFromModalWindow.id);
  }

}
