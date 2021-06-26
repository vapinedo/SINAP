import { Router } from '@angular/router';
import { ConceptoItem } from '../../../../../../core/api/models/concepto-item';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ItemMenu, PlacaTramite } from '@core/api/models';
import { ConceptoService, OperacionVehiculoService, PropVehiculosService } from '@core/api/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tramites-vehiculos',
  templateUrl: './tramites-vehiculos.component.html',
  styleUrls: ['./tramites-vehiculos.component.scss']
})
export class TramitesVehiculosComponent implements OnInit {


  public showSpinner = false;
  public showProgressBar = false;

  public dataSource = new MatTableDataSource();

  public mensaje : string;
  public primerCarga: boolean = true;

  lstTramites: Observable<ConceptoItem[]>;

  class1 = 'col-md-4';
	class2 = 'col-md-3';
	class3 = 'col-md-2';
  
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  selection = new SelectionModel<any>(true, []);
  displayColumns = ['numeroDeclaracion', 'placa', 'tramite', 'periodo', 'fecha', 'estado', 'acciones'];

  public form = this.fb.group({
    placa:         ['', [Validators.required,  Validators.minLength(7)]],
    tramite:         [''],
  })

  constructor( private fb: FormBuilder,
              private propVehiculoSvc: PropVehiculosService,
              private conceptoSvc: ConceptoService,
              private toastr: ToastrService,
              private router: Router ) { }

  ngOnInit(): void {
    this.lstTramites = this.conceptoSvc.getConceptosDebitRegistralUsingGET();
  }

  get formControls() {
    return this.form.controls;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultar(){
    this.showSpinner = true;

    let placaTramite: PlacaTramite ={
      placa: this.formControls.placa.value,
      tramite: this.formControls.tramite.value
    }
    this.propVehiculoSvc.getTramitesRegistralesUsingPOST(placaTramite)
    .subscribe({
      next: data => {
        
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 

        if(data.length == 0){
          this.mensaje = this.formControls.tramite.value != '' ? 
          'No hay información para el Trámite. Por favor verifique' :
          'No hay información para los criterios ingresados. Por favor verifique';
          if(this.primerCarga){
            this.class1 = 'col-md-4';
            this.class2 = 'col-md-3';
            this.class3 = 'col-md-2';
            this.toastr.warning(this.mensaje);
          }
        }else {
          this.mensaje = '';
          this.primerCarga = false;
          this.class1 = 'col-md-0';
          this.class2 = 'col-md-3';
          this.class3 = 'col-md-7';
        } 

      },
      error: err => {
        this.showSpinner = false;
        this.toastr.error('Ha ocurrido un error, por favor intente más tarde');  
    },
      complete: () => this.showSpinner = false
    })
  }

  verDetalle(){
    this.router.navigateByUrl('/consultas/vehiculares/tramitesVehiculosDet');
  }


}
