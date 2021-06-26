import { Component, OnInit ,Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { NormativaToTable } from '@core/api/models';
import { MatDialogRef } from '@angular/material/dialog';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-normativa-detalle',
  templateUrl: './normativa-detalle.component.html',
  styleUrls: ['./normativa-detalle.component.scss']
})
export class NormativaDetalleComponent implements OnInit {

  @Input() dataFromModalWindow: any;

  private subscription = new Subscription();
  public showSpinner = false;
  public data: NormativaToTable = null;

  constructor(public dialogRef: MatDialogRef<VentanaModalComponent>) { }

  ngOnInit(): void {
    
    this.data = this.dataFromModalWindow.data;
    console.log(this.data);
  }

  closeModalEvent(){
    this.dialogRef.close( this.dataFromModalWindow.data);
  } 

  
}
