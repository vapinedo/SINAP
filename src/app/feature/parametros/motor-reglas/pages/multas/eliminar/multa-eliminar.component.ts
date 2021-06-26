import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MultasService } from '@core/api/services';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-multa-eliminar',
  templateUrl: './multa-eliminar.component.html',
  styleUrls: ['./multa-eliminar.component.scss']
})
export class MultaEliminarComponent implements OnInit {

  @Input() dataFromModalWindow: any;
  public showSpinner = false;

  multa: any;

  public form = this.fb.group({
    observaciones: ['', [Validators.required, Validators.maxLength(500)]]
  }); 
  
  constructor( private fb: FormBuilder,
               public dialog: MatDialogRef<VentanaModalComponent>,
               private toastr: ToastrService,
               private multaSvc: MultasService
               ) { }

  get observaciones() { return this.form.get('observaciones'); }  

  ngOnInit(): void {
    this.multa = this.dataFromModalWindow.data;
  }

  get formularioControls() {
		return this.form.controls;
	}

  deleteMulta(){
    this.showSpinner = true;
    const params: MultasService.DeleteMultaUsingDELETEParams = {
      id : this.multa.multa,
      observacion : this.form.value.observaciones
    }

    this.multaSvc.deleteMultaUsingDELETE(params)
    .subscribe({   
      next: data => { 
        this.dialog.close('Eliminado');
        this.toastr.success('Registro eliminado exitosamente!');
      },
      error: err => this.toastr.error(err),
      complete: () => this.showSpinner = false
    });
  }


}
