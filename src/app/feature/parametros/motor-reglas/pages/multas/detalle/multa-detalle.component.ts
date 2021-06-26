import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { SubSink } from 'subsink';
import { MessageService } from '@core/services/message.service';
import { MultaService } from '@core/services/parametros/valores-cobros/multa.service';
import { MatDialog } from '@angular/material/dialog';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { MultasDetallePagosComponent } from '../detalle-pagos/multas-detalle-pagos.component';
import { MultasDetalleMunicipiosComponent } from '../detalle-municipios/multas-detalle-municipios.component';
import { Multas } from '@core/api/models';

@Component({
  selector: 'app-multa-detalle',
  templateUrl: './multa-detalle.component.html',
  styleUrls: ['./multa-detalle.component.scss']
})
export class MultaDetalleComponent implements OnInit, OnDestroy {

  @Input() dataFromModalWindow: any;
  @Input() multa: Multas;

  index: any;

  municipiosList : any[] = [];
  verMasMunipicios: boolean = false;
  
  public dataSource: any;
  public showSpinner = false;
  private subs = new SubSink();

  paramCilindraje;
  paramTipoPlaca;
  paramTipoVehiculo;
  paramTipoCombustible;
  paramAnioVehiculo;
  paramAnioInscripcion;
  paramAnioCirculacion;
  paramAniosCirculacion;

  constructor(
    private multaSvc: MultaService,
    private messageSvc: MessageService,
    public dialog: MatDialog,
  ) {
    //this.showSpinner = true;
  } 

  ngOnInit(): void {
    this.index = this.multa?.detalleMultaList?.length - 1;
    this.chipMunicipios();
    this.setDataSource();
  }

  chipMunicipios(){
    this.municipiosList = this.multa.detalleMultaList[this.index]?.multaMunicipioList;
  }
  
  private setDataSource(): void {
    this.multa.condicionTarifaList[this.multa.condicionTarifaList.length-1]?.parametrosList.forEach(param => {
        if(param.nombre == 'CILINDRAJE'){
          this.paramCilindraje = param;
        }else if(param.nombre == 'TIPO_VEHICULO'){
          this.paramTipoVehiculo = param;
        }else if(param.nombre == 'CLASE_PLACA'){
          this.paramTipoPlaca = param;
        }else if(param.nombre == 'TIPO_COMBUSTIBLE'){
          this.paramTipoCombustible = param;
        }else if(param.nombre == 'ANNIO_VEHICULO'){
          this.paramAnioVehiculo = param;
        }else if(param.nombre == 'ANNIO_INSCRIPCION'){
          this.paramAnioInscripcion = param;
        }else if(param.nombre == 'ANNIO_CIRCULACION'){
          this.paramAnioCirculacion = param;
        }else if(param.nombre == 'ANNIOS_CIRCULACION'){
          this.paramAniosCirculacion = param;
        }
    });
    console.log('param tipo vehi', this.paramTipoVehiculo);
  }

  verDetallePagos(){
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '50vw',
      disableClose: true,
      data: { 
        dataComponent: {
          title: 'Detalle pagos de multa',
          cuotasMulta: this.multa.detalleMultaList[this.index].cuotaMultaList 
        },
        component: MultasDetallePagosComponent
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  verDetalleMunicipios(){
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '50vw',
      disableClose: true,
      data: { 
        dataComponent: {
          title: 'Detalle municipios de multa',
          cuotasMulta: this.multa.detalleMultaList[this.index].multaMunicipioList 
        },
        component: MultasDetalleMunicipiosComponent
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
