import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VentanaModalComponent } from '../../../components/ventana-modal/ventana-modal.component';
import { ToastrService } from 'ngx-toastr';
import { TarifasService } from '@core/api/services/tarifas.service';


@Component({
  selector: 'app-tarifa-eliminar',
  templateUrl: './tarifa-eliminar.component.html',
  styleUrls: ['./tarifa-eliminar.component.scss']
})
export class TarifaEliminarComponent implements OnInit {

  @Input() dataFromModalWindow: any;
  public showSpinner = false;

  tarifa: any;

  public form = this.fb.group({
    observaciones: ['', [Validators.required, Validators.maxLength(500)]]
  }); 
  
  constructor( private fb: FormBuilder,
               public dialog: MatDialogRef<VentanaModalComponent>,
               private toastr: ToastrService,
               private tarifaSvc: TarifasService
               ) { }

  get observaciones() { return this.form.get('observaciones'); }  

  ngOnInit(): void {
    this.tarifa = this.dataFromModalWindow.data;
  }

  get formularioControls() {
		return this.form.controls;
	}

  deleteTarifa(){
    this.showSpinner = true;
    const params: TarifasService.DeleteTarifaUsingDELETEParams = {
      id : this.tarifa.id,
      observacion : this.form.value.observaciones
    }

    this.tarifaSvc.deleteTarifaUsingDELETE(params)
    .subscribe({   
      next: data => { 
        this.toastr.success('Registro eliminado exitosamente!');
        this.dialog.close('Eliminado');
      },
      error: err => this.toastr.error(err),
      complete: () => this.showSpinner = false
    });
  }


}
