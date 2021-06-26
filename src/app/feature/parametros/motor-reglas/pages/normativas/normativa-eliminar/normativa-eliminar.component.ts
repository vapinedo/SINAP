import { Component,Input, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NormativaDeleteDTO, NormativaUpdateDTO } from '@core/api/models';
import { NormativaService } from '@core/api/services';
import { ToastrService } from 'ngx-toastr';
import { FormatString } from '@core/utils/StringFuntion';
import { DELETE } from '@core/utils/Mensajes';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-normativa-eliminar',
  templateUrl: './normativa-eliminar.component.html',
  styleUrls: ['./normativa-eliminar.component.scss']
})
export class NormativaEliminarComponent implements OnInit {

  @Input() dataFromModalWindow: any;
  public showSpinner = false;
  public form = this.fb.group({
     observaciones:   ['', [Validators.required,Validators.maxLength(200)]],
  });

  constructor(
    private normativaService: NormativaService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
  ) { }

  ngOnInit(): void {
 
  }

  get observaciones() { return this.form.get('observaciones'); }  

  onSubmit(): void {
    this.showSpinner = true;

    if (this.form.valid) {

      const normativaDelete = {} as NormativaDeleteDTO;
      normativaDelete.idNormativa = this.dataFromModalWindow.data;
      normativaDelete.observaciones = this.form.get('observaciones').value

      console.log(normativaDelete);

      this.normativaService.deleteNormativaUsingDELETE(normativaDelete)
        .subscribe({
          next: data => {
            this.dialogRef.close(true);
            this.toastr.success(FormatString(DELETE, 'Normativa'));
          },
          error: err => {
            this.toastr.error(err);
            this.showSpinner = false;
          }
        });

    }

  }

}
