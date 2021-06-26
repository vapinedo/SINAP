import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DomainService, VigenciasService, ConceptoService } from '@core/api/services';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { ToastrService } from 'ngx-toastr';
import { VigenciasCrearComponent } from '../crear/vigencias-crear.component';
import { VigenciasDetalleComponent } from '../detalle/vigencias-detalle.component';
import { VigenciasEditarComponent } from '../editar/vigencias-editar.component';

@Component({
  selector: 'app-vigencias-admin',
  templateUrl: './vigencias-admin.component.html',
  styleUrls: ['./vigencias-admin.component.scss']
})
export class VigenciasAdminComponent implements OnInit {

  public dataSource: any;
  public showSpinner = false;
  public showProgressBar = false;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  selection = new SelectionModel<any>(true, []);
  displayColumns = ['periodo', 'fechaInicial', 'fechaFinal', 'descTipoPeriodo', 'conceptoNombre', 'seRepiteDesc', 'estadoDesc', 'acciones'];

  vigencias : any[];
  lstPeriodos : any[] = [];
  lstConceptos : any[] = [];
  
  constructor(
    public dialog: MatDialog,
    public vigenciasServices: VigenciasService,
    private toastr: ToastrService,
    private dominioService: DomainService,
    private conceptoService: ConceptoService

  ) { }

  ngOnInit(): void {
    this.getData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData = () => {
    this.showSpinner = true;
    this.vigenciasServices.findAllVigenciasUsingGET()
    .subscribe({
      next: data => {
        this.vigencias= data;

        this.vigencias.forEach(vigencia => {
          vigencia.estadoDesc = vigencia.estado == 'A' ? 'Activo' : 'Inactivo';
          vigencia.estado = vigencia.estado == 'A' ? true : false;
          vigencia.seRepiteDesc = vigencia.seRepite == "1" ? 'Repite' : '';
          vigencia.conceptoNombre = vigencia.concepto?.nombre;
          vigencia.conceptoId = vigencia.concepto?.id.toString();
        });

        this.dataSource = new MatTableDataSource(this.vigencias);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.getPeriodos();
      },
      error: err => this.toastr.error(err),
      complete: () => this.showSpinner = false
    });

  }

  getPeriodos(){
    this.dominioService.getDomainsByIdUsingGET('TPPERIODO')
    .subscribe({
      next: data => {
        this.lstPeriodos = data;
        this.getConceptos();
      },
      error: err => this.toastr.error(err)
    });
  }

  getConceptos(){
    this.conceptoService.getActiveConceptsDebitUsingGET()
    .subscribe({
      next: data => {
        this.lstConceptos = data;
      },
      error: err => this.toastr.error(err)
    });
  }

  onCreate() {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '50vw',
      disableClose: true,
      data: { 
        dataComponent: {
          title: 'Crear vigencia',
          periodos: this.lstPeriodos,
          conceptos: this.lstConceptos
        },
        component: VigenciasCrearComponent
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        this.getData();
        console.log(`Dialog result: ${result}`);
      });
  } 

    /**
   * Autor: Anyi Bustos
   * Descripción: detalle de la vigencia
   * @param id detalle
   */
     onViewDetail(data: any) {
      const dialogRef = this.dialog.open(VentanaModalComponent, {
        width: '45vw',
        disableClose: true,
        data: { 
          dataComponent: {
            data,
            title: 'Visualizar vigencia'
          },
          component: VigenciasDetalleComponent
        }
      });
  
      dialogRef.afterClosed()
        .subscribe(result => {
          console.log(`Dialog result: ${result}`);
          if(result){
            this.onEdit(result);
          }
        });
    }

    onEdit(item) {
      const dialogRef = this.dialog.open(VentanaModalComponent, {
        width: '50vw',
        disableClose: true,
        closeOnNavigation: false,
        data: { 
          dataComponent: {
            item,
            periodos: this.lstPeriodos,
            conceptos: this.lstConceptos,
            title: 'Editar vigencias'
          },
          component: VigenciasEditarComponent
        }
      });
  
  
      dialogRef.afterClosed()
        .subscribe(result => {
          this.getData();
          console.log(`Dialog result: ${result}`);
        });
    }  
  

}
