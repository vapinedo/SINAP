import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConceptoService } from '@core/api/services';
import { MessageService } from '@core/services/message.service';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-concepto-eliminar',
  templateUrl: './concepto-eliminar.component.html',
  styleUrls: ['./concepto-eliminar.component.scss']
})
export class ConceptoEliminarComponent implements OnInit {

  @Input() dataFromModalWindow: any;
  public showSpinner = false;

  concepto: any;

  public form = this.fb.group({
    observaciones: ['', [Validators.maxLength(500)]]
  }); 
  
  constructor( private fb: FormBuilder,
               private conceptoDebitoSvc: ConceptoService,
               private toastr: ToastrService,
               public dialog: MatDialogRef<VentanaModalComponent>,) { }

  get observaciones() { return this.form.get('observaciones'); }  

  ngOnInit(): void {
    this.concepto = this.dataFromModalWindow.data;
  }

  get formularioControls() {
		return this.form.controls;
	}

  deleteConcept(){
    this.showSpinner = true;
    const params: ConceptoService.DeleteUsingDELETEParams = {
      idConcept : this.concepto.id,
      observaciones : this.form.value.observaciones
    }

    this.conceptoDebitoSvc.deleteUsingDELETEResponse(params)
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
