import { MatSort } from '@angular/material/sort';
import { ItemMenu } from './../../../../../../core/api/models/item-menu';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { SubSink } from 'subsink';
// import { FineService } from '@core/api/services';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from '@core/services/message.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MultaService } from '@core/services/parametros/valores-cobros/multa.service';
import { MultaCrearComponent } from '@feature/parametros/motor-reglas/pages/multas/crear/multa-crear.component';
import { MultaEditarComponent } from '@feature/parametros/motor-reglas/pages/multas/editar/multa-editar.component';
import { MultaDetalleComponent } from '@feature/parametros/motor-reglas/pages/multas/detalle/multa-detalle.component';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MultasService } from '@core/api/services/multas.service';
import { FiltrosTablaService } from '@core/services/filtros-tabla.service';
import { Concepto, Department, Municipality, NormativaToTable } from '@core/api/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-multas-admin',
  templateUrl: './multas-admin.component.html',
  styleUrls: ['./multas-admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MultasAdminComponent implements OnInit, OnDestroy {

  public panelOpenState = false;
  //public filtrosRequeridos: string[] = ['tipoPlaca', 'conceptoCobro', 'tipoVehiculo', 'estado', 'periodicidad'];

  private subs = new SubSink();

  public showSpinner = false;
  public showProgressBar = false;
  public dataSource: MatTableDataSource<any>;

  lstConceptos:  Concepto[] = [];
  lstTiposPlaca:  Observable<any[]>;
  lstTiposVehiculo: Observable<any[]>;
  lstNormativas: Observable<NormativaToTable[]>;
  lstTiposCombustible: Observable<ItemMenu[]>;
  lstPeriodicidad: Observable<ItemMenu[]>;

  private parametros =  {
    vehicleType: null, 
    plateClass: null, 
    perioricity: null, 
    municipality: null
  }
  public multas: any;
  public multasBackUp: any;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  selection = new SelectionModel<any>(true, []);
  displayColumns = ['nombre', 'acciones'];
  expandedElement;

  constructor(
    public dialog: MatDialog,
    // private fineSvc: FineService,
    private multaSvc: MultaService,
    private multasSvc: MultasService,
    private messageSvc: MessageService,
    private filtrosTablaSvc: FiltrosTablaService,
  ) { }

  ngOnInit(): void {
    this.getValoresSelect();
    this.consultarMultas();  
  }

  consultarMultas(){
    this.showSpinner = true;
    this.multasSvc.findAllMultasUsingGET()
    .subscribe({
      next: data => {
        console.log('multas', data);
        this.multas = data;
        this.multasBackUp = this.multas;
        this.dataSource = new MatTableDataSource(this.multas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;        
      },
      error: err => {
        this.showSpinner = false;
      },
      complete: () => this.showSpinner = false
    })
  }

  getValoresSelect(){
    this.getConceptos();
    this.lstTiposPlaca = this.filtrosTablaSvc.tipoPlaca();
    this.lstTiposVehiculo = this.filtrosTablaSvc.tipoVehiculo();
    this.lstNormativas = this.filtrosTablaSvc.normativas();
    this.lstTiposCombustible = this.filtrosTablaSvc.tipoCombustible();
    this.lstPeriodicidad = this.filtrosTablaSvc.periodicidad();

    console.log('tipos combustible admin',   this.lstTiposCombustible );
  }

  getConceptos(){
    this.filtrosTablaSvc.conceptosDebitoActVigentesMulta()
    .subscribe({
      next: data => {
        this.lstConceptos = data;
      },
      //complete: () => this.showSpinner = false
    });
  }
  
  private setDatasource(): void {
    this.subs.add(this.multaSvc.getAll()
      .subscribe({
        next: data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          //this.dataSource.filterPredicate = this.customFilterPredicate();
        },
        error: err => {
          this.showSpinner = false;
          this.messageSvc.errorToast(err);
        },
        complete: () => this.showSpinner = false
      })
    );
  }

  cleanFilters() {
    /*this.conceptos = this.conceptosBackup;
    this.dataSource = new MatTableDataSource(this.conceptos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.selectMulta = '';
    this.selectEstado = '';*/
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  applyCustomFilter(multas: any): void {
    console.log('Multas admin', multas);
    this.dataSource = new MatTableDataSource(multas);
    this.dataSource.paginator = this.paginator;
  }
  
  private customFilterPredicate(): (dataSource: any, filter: string) => boolean {
    const filterFunction = function (dataSource, filter): boolean {
      const searchTerms = JSON.parse(filter);

      return dataSource.municipio.indexOf(searchTerms.municipio) !== -1
        && dataSource.conceptoCobro.indexOf(searchTerms.conceptoCobro) !== -1;
    }
    return filterFunction;
  }

  onCreate() {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '55vw',
      disableClose: true,
      data: { 
        dataComponent: { 
          title: 'Generación multa',
          lstTiposPlaca : this.lstTiposPlaca,
          lstTiposVehiculo : this.lstTiposVehiculo,
          lstTiposCombustible : this.lstTiposCombustible,
          lstPeriodicidad : this.lstPeriodicidad,
          lstMultas : this.multas
        },

        component: MultaCrearComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(result => {
          if(result == 'Creado'){
            this.consultarMultas();
            console.log(`Dialog result: ${result}`);
          }
        })
    );
  }  

  onEdit(multa) {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '55vw',
      disableClose: true,
      data: { 
        dataComponent: { multa: multa, 
        title: 'Multa editar',
        lstTiposPlaca : this.lstTiposPlaca,
        lstTiposVehiculo : this.lstTiposVehiculo,
        lstTiposCombustible : this.lstTiposCombustible,
        lstPeriodicidad : this.lstPeriodicidad,
        lstMultas : this.multas },
        component: MultaEditarComponent,
      }
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(result => {
          console.log(`Dialog result: ${result}`);
          if(result == 'Refrescar'){
            this.consultarMultas();
          }   
        })
    );
  }  

  onViewDetail(id: number) {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '45vw',
      disableClose: true,
      data: { 
        dataComponent: { id, title: 'Multa detalle' },
        component: MultaDetalleComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(result => {
          console.log(`Dialog result: ${result}`);
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}