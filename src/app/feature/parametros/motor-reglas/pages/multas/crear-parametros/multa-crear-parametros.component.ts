import { Component, OnInit, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VariablesRecaudoService } from '@core/api/services';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';


@Component({
  selector: 'app-multa-crear-parametros',
  templateUrl: './multa-crear-parametros.component.html',
  styleUrls: ['./multa-crear-parametros.component.scss']
})
export class MultaCrearParametrosComponent implements OnInit {

  parametros : any[] = [];

  @Output() chequeados : EventEmitter<any> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<MultaCrearParametrosComponent>,
              private variableRecaudoSvc: VariablesRecaudoService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.variableRecaudoSvc.findAllVariablesRecaudoUsingGET()
    .subscribe({
      next: data => {
        console.log('Parametros', data)
        this.parametros = data;
        this.parametros.forEach(param =>{
          param.estado= '0'
        });
        this.setearParametros();
      }

    });
   /* this.parametros = [{nombre: 'Calse de placa', id:1, estado : '0'}, 
    {nombre : 'Tipo de vehiculo', id:2, estado : '0'},{ nombre: 'Tipo de combustible', id:3 , estado : '0'}]*/
  
  }

  setearParametros(): void {
    if (this.data?.parametros && this.data?.parametros?.length > 0) {
      const entrada: string[] = this.data?.parametros?.filter(param => param?.estado === '1').map(param => param?.nombre);
      this.parametros.forEach(param => {
        if (entrada.includes(param.nombre)) {
          param.estado = '1'
        }
      });
    }
  }

  changeCheckbox(event: any, index: number): void {​​​​​​​​ 
    this.parametros[index].estado = event.checked ? '1' : '0';
    this.chequeados.emit(this.parametros);
  }​​​​​​​​

  ngOnDestroy(): void {
    this.dialogRef.close(this.parametros);
  } 

}
