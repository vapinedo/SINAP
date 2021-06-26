import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptoCuentaCorriente, EstadoCuentaFilter, EstadoCuentaToMainTable } from '@core/api/models';
import { ConceptoService, EstadoCuentaCorrienteService } from '@core/api/services';
import { StorageService } from '@core/services/storage.service';
import { NON_CHAR_SPECIAL_REG_EXP, SOLO_NUMEROS } from '@core/utils/Patterns';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consulta-cuenta-corriente',
  templateUrl: './consulta-cuenta-corriente.component.html',
  styleUrls: ['./consulta-cuenta-corriente.component.scss']
})
export class ConsultaCuentaCorrienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

  public showSpinner = false;
  public formulario: FormGroup;

  claseCuentas: ConceptoCuentaCorriente[] = [];
  data: EstadoCuentaToMainTable[] = [];
  public dataSource = new MatTableDataSource(this.data);

  search: string = '';
  displayColumns = ['placa','rtnNumerico','rtnAlfanumerico','propietario','acciones'];
  limpiarForm : string;

  class1 = 'col-md-2';
	class2 = 'col-md-8';
	class3 = 'col-md-2';

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,    
              public dialog: MatDialog,
              public router: Router,
              public cuentaCorrienteSvc: EstadoCuentaCorrienteService,
              public conceptoService: ConceptoService,
              private activatedRoute: ActivatedRoute,
		          private storageService: StorageService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      rtnNumerico: new FormControl('', [
				Validators.minLength(14),
				Validators.maxLength(14),
				Validators.pattern(SOLO_NUMEROS),
			]),
			rtnAlfanumerico: new FormControl('', [
				Validators.minLength(7),
				Validators.maxLength(7),
				Validators.pattern(NON_CHAR_SPECIAL_REG_EXP),
			]),
			placa: new FormControl('', [
				Validators.minLength(6),
				Validators.maxLength(8),
				Validators.pattern(NON_CHAR_SPECIAL_REG_EXP),
			]),
      idConcepto: new FormControl('', [Validators.required])
    });
    this.limpiarForm = this.activatedRoute.snapshot.paramMap.get('limpiar_form');

    if(!this.limpiarForm){
      this.formulario.reset();
      this.storageService.deleteItem('filtroConsulta');
    }

    if (this.storageService.keyExists('filtroConsulta')) {
      this.formulario.patchValue(this.storageService.getItem('filtroConsulta'));
      this.consultar();
    }

    this.cargarConceptos();
  }

  get formularioControls() {
		return this.formulario.controls;
	}

  cargarConceptos(){
    this.showSpinner = true;
    this.conceptoService.getConceptosCuentaCorrienteUsingGET().subscribe({
      next:(data) =>{
        this.claseCuentas = data;
      },
      error:(err) =>{
        this.toastr.error(err);
        this.showSpinner = false
      },
      complete: () => (this.showSpinner = false),
    });
  }

  consultar(){
    if(this.formulario.valid){
      this.showSpinner = true;
      const filtro = {} as EstadoCuentaFilter;      

      if(this.formularioControls.rtnNumerico.value){
        filtro.rtnNumerico = this.formularioControls.rtnNumerico.value;
      }
      if(this.formularioControls.rtnAlfanumerico.value){
        filtro.rtnAlfanumerico = this.formularioControls.rtnAlfanumerico.value;
      }
      if(this.formularioControls.placa.value){
        filtro.placa = this.formularioControls.placa.value;
      }
      if(this.formularioControls.idConcepto.value){
        filtro.idConcepto = this.formularioControls.idConcepto.value;
      }

      this.cuentaCorrienteSvc.getVehiculosCuentaUsingPOST(filtro).subscribe({
        next:(data) =>{
          this.data = data;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if (this.data.length > 0){            
            this.class1 = 'col-md-0';
            this.class2 = 'col-md-3';
            this.class3 = 'col-md-9';
            this.storageService.setItem('filtroConsulta', filtro);
          }else{
            this.class1 = 'col-md-2';
            this.class2 = 'col-md-8';
            this.class3 = 'col-md-2';
            this.storageService.deleteItem('filtroConsulta');
            this.toastr.warning('No se encontró información relacionada a esta búsqueda');
          }
        },
        error:(err) =>{
          this.toastr.error(err);
					this.showSpinner = false;
          this.class1 = 'col-md-2';
          this.class2 = 'col-md-8';
          this.class3 = 'col-md-2';
          this.data = [];
          this.storageService.deleteItem('filtroConsulta');
        },
				complete: () => (this.showSpinner = false),
      });
    }      
  }
  
  openDetail(idVehiculo){

    let idTasa = this.formularioControls.idConcepto.value;
    let tipoTasa: string; 
    this.claseCuentas.forEach(item =>{
      if(item.id === idTasa){
        tipoTasa = item.tipoConcepto;
      }
    });    

    this.router.navigateByUrl(      
			'/consultas/bancarias/detalle-cuenta-corriente/'+ idVehiculo + '/' +  tipoTasa +'/' + idTasa
		);
  }

  applyFilterSearch(event: string): void {
		this.dataSource.filter = event;
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}
