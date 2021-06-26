/* -----------------------------------------
AUTOR: Victor Pinedo
EMPRESA: Asesoftware
REQUERIMIENTO: Sprint_02 - HU_1.6.x
FECHA CREACIÓN: Marzo 23 de 2021
------------------------------------------- */
import { SubSink } from 'subsink';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '@core/services/message.service';
import { TarifasService } from '@core/api/services/tarifas.service';
import { TarifaCrearComponent } from '../crear/tarifa-crear.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { TarifaRegistralCrearComponent } from '@feature/parametros/valores-cobros/pages/tarifas/registral-crear/tarifa-registral-crear.component';
import { TarifaRegistralEditarComponent } from '@feature/parametros/valores-cobros/pages/tarifas/registral-editar/tarifa-registral-editar.component';
// import { TarifaEditarComponent } from '@feature/parametros/valores-cobros/pages/tarifas/editar/tarifa-editar.component';
import { Observable, Subject } from 'rxjs';
import { ItemMenu } from '@core/api/models/item-menu';
import { Concepto } from '@core/api/models/concepto';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { NormativaToTable } from '@core/api/models/normativa-to-table';
import { TarifaEditarComponent } from '../editar/tarifa-editar.component';
import { TarifaNormalRegistral } from '@core/api/models/tarifa-normal-registral';
import { MultasDetalleMunicipiosComponent } from '../../../../motor-reglas/pages/multas/detalle-municipios/multas-detalle-municipios.component';

@Component({
  selector: 'app-tarifas-admin',
  templateUrl: './tarifas-admin.component.html',
  styleUrls: ['./tarifas-admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('expanded', style({height: '*', padding: '2.5em .5em'})),
      state('collapsed', style({height: '0px', minHeight: '0'})),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TarifasAdminComponent {

  private subs = new SubSink();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  expandedElement: any | null;
  displayColumns = ['nombreTarifa'];
  data: TarifaNormalRegistral[] = [];
  backup: TarifaNormalRegistral[] = [];
  search: any;

  // filtros
  // // selects para poblar el formulario ( observables todos )
  lstConceptos:  Concepto[] = [];
  lstTiposPlaca:  Observable<any[]>;
  lstTiposVehiculo: Observable<any[]>;
  lstNormativas: Observable<NormativaToTable[]>;
  lstTiposCombustible: Observable<ItemMenu[]>;
  lstPeriodicidad: Observable<ItemMenu[]>;
  clearFilters: Subject<void> = new Subject<void>();


  public mostrarSpinner = false;
  public dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private tarifasSvc: TarifasService,
    private messageSvc: MessageService,
    private filtrosTablaSvc: FiltrosTablaService,
  ) { 
    this.mostrarSpinner = true;
    this.getValoresSelect();
    this.setDatasource(); 
  }

  private setDatasource(): void {
    this.clearFilters.next();
    this.search = '';
    this.subs.add(this.tarifasSvc.findAllTarifasUsingGET()
      .subscribe({
        next: data => {
          console.log(data);
          this.data = data;
          this.backup = data;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
        },
        error: err => {
          this.mostrarSpinner = false;
          this.messageSvc.errorToast(err);
        },
        complete: () => this.mostrarSpinner = false
      })
    );
  }

  filtroGeneral(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getValoresSelect(){
    this.getConceptos();
    this.lstTiposPlaca = this.filtrosTablaSvc.tipoPlaca();
    this.lstTiposVehiculo = this.filtrosTablaSvc.tipoVehiculo();
    this.lstNormativas = this.filtrosTablaSvc.normativas();
    this.lstTiposCombustible = this.filtrosTablaSvc.tipoCombustible();
    this.lstPeriodicidad = this.filtrosTablaSvc.periodicidad();
  }

  getConceptos(){
    this.filtrosTablaSvc.conceptoDebito()
    .subscribe({
      next: data => {
        this.lstConceptos = data;
      }
    });
  }

  applyCustomFilter(tarifa: any): void {
    this.search = '';
    this.dataSource = new MatTableDataSource(tarifa);
    this.dataSource.paginator = this.paginator;
  }


  onEdit(id: number, registral: boolean): void {
    let dialogRef;
    if (registral) {
      dialogRef = this.dialog.open(VentanaModalComponent, {
        width: '55vw',
        disableClose: true,
        data: { 
          dataComponent: { id, title: 'Editar tarifa por concepto de débito registral' },
          component: TarifaRegistralEditarComponent
        }
      });
    } else {
      dialogRef = this.dialog.open(VentanaModalComponent, {
        width: '55vw',
        disableClose: true,
        data: { 
          dataComponent: { id, title: 'Editar tarifa por concepto de débito' },
          component: TarifaEditarComponent
        }
      });
    }

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(success => {
          if(success) {
            this.mostrarSpinner = true;
            this.setDatasource();
          }
        })
    )
  }  

  onCreate(): void {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '55vw',
      disableClose: true,
      data: { 
        dataComponent: { title: 'Crear tarifa por concepto de débito' },
        component: TarifaCrearComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(success => {
          if(success) {
            this.mostrarSpinner = true;
            this.setDatasource();
          }
        })
    )
  }  

  onCreateRegistral(): void {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '55vw',
      disableClose: true,
      data: { 
        dataComponent: { title: 'Crear tarifa por concepto de débito registral' },
        component: TarifaRegistralCrearComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(success => {
          if(success) {
            this.mostrarSpinner = true;
            this.setDatasource();
          }
        })
    )
  }  

  verDetalleMunicipios(tarifa: TarifaNormalRegistral){
    this.dialog.open(VentanaModalComponent, {
      width: '50vw',
      disableClose: true,
      data: { 
        dataComponent: {
          title: 'Detalle municipios de tarifa',
          cuotasMulta: tarifa.municipiosList
        },
        component: MultasDetalleMunicipiosComponent
      }
    });
  }

}