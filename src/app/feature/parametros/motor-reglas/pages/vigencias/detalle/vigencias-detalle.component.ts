import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-vigencias-detalle',
  templateUrl: './vigencias-detalle.component.html',
  styleUrls: ['./vigencias-detalle.component.scss']
})
export class VigenciasDetalleComponent implements OnInit {

  @Input() dataFromModalWindow: any;

  //@Input() data: any;

  public dataSource: any;
  public showSpinner = false;

  constructor( public dialogRef: MatDialogRef<VentanaModalComponent>) {  } 

  ngOnInit(): void {
    this.dataSource = this.dataFromModalWindow.data ;
  }

  closeModalEvent(){
    this.dialogRef.close( this.dataFromModalWindow.data);
  }
  
}
