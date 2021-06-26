import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-concepto-detalle',
  templateUrl: './concepto-detalle.component.html',
  styleUrls: ['./concepto-detalle.component.scss']
})
export class ConceptoDetalleComponent implements OnInit {

  @Input() dataFromModalWindow: any;

  public dataSource: any;
  public showSpinner = false;

  constructor(    public dialogRef: MatDialogRef<VentanaModalComponent>) {  } 

  /**
   * Autor: Fabián Orozco
   * Empresa: Asesoftware
   * Requerimiento: Sprint_1 - HU_1.4.2
   * Fecha: 25/February/2021
   * Descripción: Consultar detalle
   */
  ngOnInit(): void {
    this.dataSource = this.dataFromModalWindow.data;
    console.log('Concepto editar', this.dataSource);
  }

  closeModalEvent(){
    this.dialogRef.close( this.dataFromModalWindow.data);
  }
  

}
