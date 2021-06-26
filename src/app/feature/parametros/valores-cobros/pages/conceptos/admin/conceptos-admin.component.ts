import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConceptoCrearComponent } from '@feature/parametros/valores-cobros/pages/conceptos/crear/concepto-crear.component';
import { ConceptoEditarComponent } from '@feature/parametros/valores-cobros/pages/conceptos/editar/concepto-editar.component';
import { ConceptoDetalleComponent } from '@feature/parametros/valores-cobros/pages/conceptos/detalle/concepto-detalle.component';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { ConceptoService, NormativaService } from '@core/api/services';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-conceptos-admin',
  templateUrl: './conceptos-admin.component.html',
  styleUrls: ['./conceptos-admin.component.scss']
})
export class ConceptosAdminComponent implements OnInit, OnDestroy {

  private subscription1 = new Subscription();
  private subscription2 = new Subscription();

  public dataSource: any;
  public dataSourceNormative: any;
  public showSpinner = false;
  public showProgressBar = false;

  selectMulta: string;
  selectEstado: string;

  filterValues: any = {
    cobroMulta: '', 
    estado: ''
  };

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  selection = new SelectionModel<any>(true, []);
  displayColumns = ['nombre', 'nombreNormativa', 'cobraMultaDesc', 'estadoDesc', 'id'];

  conceptos : any[];
  conceptosBackup: any[] = [];



  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private conceptoDebitoSvc: ConceptoService,
    private normativeSrv: NormativaService
  ) { }

  ngOnInit(): void {
   this.getData();
  }

  /**
   * Autor: Fabián Orozco
   * Empresa: Asesoftware
   * Requerimiento: Sprint_1 - HU_1.4.2
   * Fecha: 25/February/2021
   * Descripción: Obtener los datos, consulta principal
   */
  getData = () => {
    this.showSpinner = true;
    this.subscription1 = this.conceptoDebitoSvc.getAllConceptsByTipologyUsingGET('CONDEB')
      .subscribe({
        next: data => {
          this.conceptos = data;
          this.conceptos.forEach(concept => {
            concept.estadoDesc = concept.estado == 'A' ? 'Activo' : 'Inactivo';
            concept.estado = concept.estado == 'A' ? true : false;
            concept.cobraMultaDesc = concept.cobraMulta == "1" ? 'Si' : 'No';
            concept.nombreNormativa = concept.normativa?.nombre;
            concept.idNormativa = concept.normativa?.idNormativa;
          });

          this.conceptosBackup = this.conceptos;
          this.dataSource = new MatTableDataSource(this.conceptos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => this.toastr.error(err),
        complete: () => this.showSpinner = false
      });
      //Obtener normativas
      this.subscription2 = this.normativeSrv.searchUsingGET()
        .subscribe({
          next: data => {
            this.dataSourceNormative = [];
            this.dataSourceNormative = data;
          },
          error: err => this.toastr.error(err),
          complete: () => this.showSpinner = false
        });
  }

  /**
   * Autor: Fabián Orozco
   * Empresa: Asesoftware
   * Requerimiento: Sprint_1 - HU_1.4.2
   * Fecha: 25/February/2021
   * Descripción: Filtro superior de la pantalla
   * @param value valor
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /**
   * Autor: Fabián Orozco
   * Empresa: Asesoftware
   * Requerimiento: Sprint_1 - HU_1.4.2
   * Fecha: 25/February/2021
   * Descripción: Envento de creación
   */
  onCreate() {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '55vw',
      disableClose: true,
      data: { 
        dataComponent: {
          data: this.dataSourceNormative,
          title: 'Crear concepto de débito'
        },
        component: ConceptoCrearComponent
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        this.getData();
        console.log(`Dialog result: ${result}`);
      });
  } 

  /**
   * Autor: Fabián Orozco
   * Empresa: Asesoftware
   * Requerimiento: Sprint_1 - HU_1.4.2
   * Fecha: 25/February/2021
   * Descripción: Edicion de conceptos
   * @param id id a editar
   */
  onEdit(item) {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '55vw',
      disableClose: true,
      closeOnNavigation: false,
      data: { 
        dataComponent: {
          item,
          normatives: this.dataSourceNormative,
          title: 'Editar concepto de débito'
        },
        component: ConceptoEditarComponent
      }
    });


    dialogRef.afterClosed()
      .subscribe(result => {
        this.getData();
        console.log(`Dialog result: ${result}`);
      });
  }  

  /**
   * Autor: Fabián Orozco
   * Empresa: Asesoftware
   * Requerimiento: Sprint_1 - HU_1.4.2
   * Fecha: 25/February/2021
   * Descripción: detalle del concepto
   * @param id detalle
   */
  onViewDetail(data: any) {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '45vw',
      disableClose: true,
      data: { 
        dataComponent: {
          data,
          title: 'Visualizar concepto de débito'
        },
        component: ConceptoDetalleComponent
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

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  filter() {
    console.log('Conceptos::', this.conceptos);
    this.conceptos = [];
    this.conceptos = this.conceptosBackup.filter(x => {
    
      let matchMulta = true;
      let matchEstado = true;

      
      if(this.selectMulta){
        matchMulta = x.cobraMultaDesc === this.selectMulta.toString();}
      if(this.selectEstado)
        matchEstado = x.estadoDesc === this.selectEstado.toString();

      return matchMulta && matchEstado;
    });

    this.dataSource = new MatTableDataSource(this.conceptos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  cleanFilters() {
    this.conceptos = this.conceptosBackup;
    this.dataSource = new MatTableDataSource(this.conceptos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.selectMulta = '';
    this.selectEstado = '';
  }

}