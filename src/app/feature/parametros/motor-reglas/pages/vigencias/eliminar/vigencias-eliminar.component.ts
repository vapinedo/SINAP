import { VigenciasService } from '@core/api/services';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vigencias-eliminar',
  templateUrl: './vigencias-eliminar.component.html',
  styleUrls: ['./vigencias-eliminar.component.scss']
})
export class VigenciasEliminarComponent implements OnInit {

  @Input() dataFromModalWindow: any;
  public showSpinner = false;

  vigencia: any;

  public form = this.fb.group({
    observaciones: ['', [Validators.maxLength(500)]]
  }); 
  
  constructor( private fb: FormBuilder,
               public dialog: MatDialogRef<VentanaModalComponent>,
               private vigenciaService: VigenciasService,
               private toastr: ToastrService
               ) { }

  get observaciones() { return this.form.get('observaciones'); }  

  ngOnInit(): void {
    this.vigencia = this.dataFromModalWindow.data;
  }

  get formularioControls() {
		return this.form.controls;
	}

  deleteVigencia(){
    this.showSpinner = true;
    const params: VigenciasService.DeleteVigenciaUsingDELETEParams = {
      idVigencia : this.vigencia.idVigencia,
      observaciones : this.form.value.observaciones
    }

    this.vigenciaService.deleteVigenciaUsingDELETE(params)
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
