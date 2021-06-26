import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExentosFilter, ExentosToTable, ExentoVehiculo } from '@core/api/models';
import { NON_CHAR_SPECIAL_REG_EXP, SOLO_NUMEROS } from '@core/utils/Patterns';
import { ToastrService } from 'ngx-toastr';
import { VehiculosExentosService } from '@core/api/services';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { VehiculosExentosDetalleComponent } from './detalle/vehiculos-exentos-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-vehiculos-exentos',
  templateUrl: './vehiculos-exentos.component.html',
  styleUrls: ['./vehiculos-exentos.component.scss']
})
export class VehiculosExentosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
  public formulario: FormGroup;
  public showSpinner = false;
  
  displayColumns = ['numeroPlaca','comprobante','tipoVehiculo', 'acciones'];

  encabezado: ExentosToTable;
  data: ExentoVehiculo[] = [];
  dataBackup: ExentoVehiculo[] = [];
	public dataSource = new MatTableDataSource(this.data);

  filterPlaca: String[] = [];
  filterComprobante: String[] = [];
  filterTipo: String[] = [];
  selectPlaca:String;
  selectCompro:String;
  selectTipo:String;
  search: string = '';

  class1 = 'col-md-4';
	class2 = 'col-md-3';
	class3 = 'col-md-2';
  
  private subs = new SubSink();

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private exentosService: VehiculosExentosService,
              public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      RTNNumerico: new FormControl('', [
				Validators.minLength(14),
				Validators.maxLength(14),
				Validators.pattern(SOLO_NUMEROS),
			]),
			RTNAlfanumerico: new FormControl('', [
				Validators.minLength(7),
				Validators.maxLength(7),
				Validators.pattern(NON_CHAR_SPECIAL_REG_EXP),
			]),
			placa: new FormControl('', [
				Validators.minLength(6),
				Validators.maxLength(8),
				Validators.pattern(NON_CHAR_SPECIAL_REG_EXP),
			])
    });
  }

  get formularioControls() {
		return this.formulario.controls;
	}

  consultar(){

    if(this.formulario.valid && this.validarCampos()){
      const filtro = {} as ExentosFilter;
      this.showSpinner = true;

      if(this.formularioControls.RTNNumerico.value){
        filtro.rtnNumerico = this.formularioControls.RTNNumerico.value;
      }
      if(this.formularioControls.RTNAlfanumerico.value){
        filtro.rtnAlfanumerico = this.formularioControls.RTNAlfanumerico.value;
      }
      if(this.formularioControls.placa.value){
        filtro.placa = this.formularioControls.placa.value;
      }

      this.exentosService.getExentosRtnPlacaUsingPOST(filtro).subscribe({
        next:(data) =>{
          this.encabezado = data;
          this.data = this.encabezado.exentos;
          this.dataBackup = this.data;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if (this.data.length > 0) {
						this.class1 = 'col-md-0';
            this.class2 = 'col-md-3';
            this.class3 = 'col-md-9';
            this.buildFilters();
					} else {
						this.class1 = 'col-md-4';
            this.class2 = 'col-md-3';
            this.class3 = 'col-md-2';
						this.toastr.warning('No se encontró información relacionada a esta búsqueda');
					}
        },
        error: (err) => {
					this.toastr.error(err);
					this.showSpinner = false;
					this.class1 = 'col-md-4';
          this.class2 = 'col-md-3';
          this.class3 = 'col-md-2';
					this.data = [];
				},
				complete: () => (this.showSpinner = false),
      });

    }       
  }
  
  validarCampos(){
    if(!this.formularioControls.RTNAlfanumerico.value &&
       !this.formularioControls.RTNNumerico.value &&
       !this.formularioControls.placa.value){
        this.toastr.error(
          'Es obligatorio ingresar al menos uno de los siguientes campos: <ul> <li>RTN Numérico</li> <li>RTN Alfanumérico</li> <li>Placa </li>',
          '',
          { enableHtml: true }
        );
        return false;
       }
    return true;
  }

  buildFilters(){

    this.filterComprobante = [];
    this.filterPlaca = [];
    this.filterTipo = [];

    this.data.forEach(element =>{    
      this.filterComprobante.push(element.comprobante);
      this.filterPlaca.push(element.numeroPlaca);
      this.filterTipo.push(element.tipoVehiculo);
    });    

    this.filterComprobante = this.removeDuplicates(this.filterComprobante);
    this.filterPlaca = this.removeDuplicates(this.filterPlaca);
    this.filterTipo = this.removeDuplicates(this.filterTipo);

  }

  removeDuplicates(originalArray){
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
      lookupObject[originalArray[i]] = originalArray[i];
    }

    for(i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    
    return newArray;
  }

  applyFilter(){
    this.data = [];
    this.search = '';
    this.data = this.dataBackup.filter(x => {
      let mathPlaca = true;
      let mathCompro = true;
      let mathTipo = true;

      if (this.selectPlaca) {
        mathPlaca = x.numeroPlaca.toString().trim().toLowerCase() === this.selectPlaca.toString().trim().toLowerCase();
      }
      if (this.selectCompro) {
        mathCompro = x.comprobante.toString().trim().toLowerCase() === this.selectCompro.toString().trim().toLowerCase();
      }
      if (this.selectTipo) {
        mathTipo = x.tipoVehiculo.toString().trim().toLowerCase() === this.selectTipo.toString().trim().toLowerCase();
      }
      return mathPlaca && mathCompro && mathTipo;
    });

    if (this.data.length <= 0) {
      this.data = this.dataBackup;      
      this.toastr.error('No hay información que coincida con los criterios ingresados');
    }

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if(this.selectPlaca){
      this.buildFiltersPlaca();
    }   
    if (this.selectCompro) {
      this.buildFiltersCompro();
    }
    if (this.selectTipo) {
      this.buildFiltersTipo();
    }
  }

  buildFiltersTipo(){    
    this.filterComprobante = [];
    this.filterPlaca = [];    
    this.data.forEach(element =>{    
      this.filterComprobante.push(element.comprobante);
      this.filterPlaca.push(element.numeroPlaca);      
    });    
    this.filterComprobante = this.removeDuplicates(this.filterComprobante);
    this.filterPlaca = this.removeDuplicates(this.filterPlaca);    
  }

  buildFiltersCompro(){    
    this.filterPlaca = [];
    this.filterTipo = [];
    this.data.forEach(element =>{          
      this.filterPlaca.push(element.numeroPlaca);
      this.filterTipo.push(element.tipoVehiculo);
    });        
    this.filterPlaca = this.removeDuplicates(this.filterPlaca);
    this.filterTipo = this.removeDuplicates(this.filterTipo);
  }

  buildFiltersPlaca(){
    this.filterComprobante = [];    
    this.filterTipo = [];
    this.data.forEach(element =>{    
      this.filterComprobante.push(element.comprobante);      
      this.filterTipo.push(element.tipoVehiculo);
    });    
    this.filterComprobante = this.removeDuplicates(this.filterComprobante);    
    this.filterTipo = this.removeDuplicates(this.filterTipo);
  }

  applyFilterSearch(event: string): void {
		this.dataSource.filter = event;
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

  cleanFilterValidator(): boolean {
    return !(this.selectCompro || this.selectPlaca ||
      this.selectTipo);
  }

   cleanFilters() {
    this.data = this.dataBackup;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.selectCompro = undefined;
    this.selectPlaca = undefined;
    this.selectTipo = undefined;    

    this.buildFilters()
  }

  openDetail(id){
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '100vw',
      disableClose: true,
      data: {
        dataComponent: {
          oneButtonAction: true,
          title: 'Detalles del vehículo',
          id
        },
        component: VehiculosExentosDetalleComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(result => {
        
      })
    );
  }

  

}
