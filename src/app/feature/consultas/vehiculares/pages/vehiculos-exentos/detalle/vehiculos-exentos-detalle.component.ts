import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VehiculosExentosService } from '@core/api/services';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ExentosDetail } from '@core/api/models/exentos-detail';

@Component({
  selector: 'app-vehiculos-exentos-detalle',
  templateUrl: './vehiculos-exentos-detalle.component.html',
  styleUrls: ['./vehiculos-exentos-detalle.component.scss']
})
export class VehiculosExentosDetalleComponent implements OnInit {

  @Input() dataFromModalWindow: any;

  private subscription = new Subscription();
  public showSpinner = false;
  data: ExentosDetail;

  constructor(private toastr: ToastrService,
              private exentosService: VehiculosExentosService,
              public dialogRef: MatDialogRef<VehiculosExentosDetalleComponent>) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(){
    let id = this.dataFromModalWindow.id;
    this.exentosService.getDetailExentoUsingGET(id).subscribe({
      next:(data) =>{
        this.data = data;               
      },
      error: (err) => {
        this.toastr.error(err);
        this.showSpinner = false;        
      },
      complete: () => (this.showSpinner = false),
    });
  }

  closeModalEvent(){
    this.dialogRef.close();
  }

  openEstadoCuenta(){
    
  }

}
