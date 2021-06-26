import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageService } from '@core/services/message.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DatosDePruebaService } from '@core/services/datos-de-prueba.service';
import { NormativaService } from '@core/api/services';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ItemMenu } from '@core/api/models/item-menu';

import { NormativaToTable } from '@core/api/models';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { NormativaModificarComponent } from "@feature/parametros/motor-reglas/pages/normativas/normativa-modificar/normativa-modificar.component";
import { NormativaDetalleComponent } from '@feature/parametros/motor-reglas/pages/normativas/normativa-detalle/normativa-detalle.component';
import { NormativaCrearComponent } from '@feature/parametros/motor-reglas/pages/normativas/normativa-crear/normativa-crear.component';
import { DomainService } from '@core/api/services';
import { Dominios } from '@core/models/Dominios';
import { ToastrService } from 'ngx-toastr';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-normativas-admin',
  templateUrl: './normativas-admin.component.html',
  styleUrls: ['./normativas-admin.component.scss']
})
export class NormativasAdminComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    
  private subs = new SubSink();

  private subscription1 = new Subscription();

  public documentos: ItemMenu[] = [];

  public dataSource = new MatTableDataSource([]);
  public showSpinner = false;
  public showProgressBar = false;
  public campo: any;

  
  selection = new SelectionModel<any>(true, []);
  displayColumns = ['documento', 'nombre', 'publicacion', 'inicioVigencia', 'finVigencia', 'estado','id'];


  documentoFilter = new FormControl('');
	vigenciaFilter = new FormControl('');
	publicacionFilter = new FormControl('');
	estadoFilter = new FormControl('');

  data: NormativaToTable[] = [];
  dataBackup: NormativaToTable[] = [];

  filtroEstado: string[] = [];
  filtroDocumento: string[] = [];

  filterValues: any = {
		documento: '',
		publicacion: '',
		vigencia: '',
		estado: '',
	};

  //para filtro
  filterDocumento: string;
  filterEstado: string;
  filterPublicacion: string;
  filterVigencia: string;

  constructor(
    public dialog: MatDialog,
    private messageSvc: MessageService,
    private normativaSvc :NormativaService,
    private domainService: DomainService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;
  
    this.getDocumentos();
    this.getNormativas();
  }

  getNormativas(){
    this.subs.add(
      this.normativaSvc.getNormativaUsingGET()
       .subscribe({
         next: data => {
           this.data=data;
           this.dataBackup=data;
           this.dataSource = new MatTableDataSource(this.data);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort=this.sort;
         },
         error: err => {
          this.toastr.error(err);
          this.showSpinner = false;
        },
      
         
         complete: () => this.showSpinner = false
       })
       );
  }

  getDocumentos(){
    this.domainService
    .getDomainsByIdUsingGET(Dominios.DOCUMENTO_NORMATIVA)
    .subscribe({
      next: (data) => {
        this.documentos = data;
      },
      error: err => {
        this.toastr.error(err);
        this.showSpinner = false;
      },
    });
  }

  clearFilter() : void {
		this.documentoFilter.setValue('');
		this.publicacionFilter.setValue('');
		this.vigenciaFilter.setValue('');
		this.estadoFilter.setValue('');


    this.data = this.dataBackup;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.filterDocumento = '';
    this.filterEstado = '';
    this.filterPublicacion = '';
    this.filterVigencia = '';
	}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  applyCustomFilter() {
    this.data = [];
    this.data = this.dataBackup.filter(x => {

      let matchDocumento = true;
      let matchEstado = true;
      let matchPublicacion = true;
      let matchVigencia = true;
      
      if(this.filterDocumento){
        matchDocumento=  x.documento.toString() === this.filterDocumento.toString();
      }
      if(this.filterEstado){
        matchEstado=  x.estado.toString() === this.filterEstado.toString();
      }
      if(this.filterPublicacion){
        var filterPubCop = this.filterPublicacion.replace('/','-').replace('/','-');
        matchPublicacion=  x.publicacion.toString().includes(filterPubCop.toString());
      }
      if(this.filterVigencia){
      
        var filterVigenciaCop = this.filterVigencia.replace('/','-').replace('/','-');
        matchVigencia=  (x.inicioVigencia.toString().includes(filterVigenciaCop.toString()) || x.finVigencia?.toString().includes(filterVigenciaCop.toString()));
      }

      return matchDocumento && matchEstado && matchPublicacion && matchVigencia;
    });

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel='';
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
  }

  onEdit(id: number) {
    const dialogRef = this.dialog.open(NormativaModificarComponent, {
      disableClose: true,
      data: id,
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(result => {
          this.getNormativas();
        })
    )
   
  }  

  
  openDetail(data: any) {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '35vw',
      disableClose: true,
      data: { 
        dataComponent: { data, title: 'Visualizar Normativa' },
        component: NormativaDetalleComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(result => {
          this.getNormativas();
          if(result){
            this.onEdit(result.idNormativa);
          }

        })
    );
  }

  onCreate() {
    const dialogRef = this.dialog.open(NormativaCrearComponent, {
      
      disableClose: true,
      data: { 
        dataComponent: { title: 'Crear Normativa' },
        component: NormativaCrearComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(result => {
         this.getNormativas();
        })
    );
  } 




}