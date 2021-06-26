import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoCuentaCFooter, EstadoCuentaCHeader, EstadoCuentaCToTable, EstadoCuentaVehiFilter } from '@core/api/models';
import { EstadoCuentaCorrienteService } from '@core/api/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-cuenta-corriente',
  templateUrl: './detalle-cuenta-corriente.component.html',
  styleUrls: ['./detalle-cuenta-corriente.component.scss']
})
export class DetalleCuentaCorrienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

  encabezado: EstadoCuentaCHeader;
  data: EstadoCuentaCToTable[] = [];
  footer: EstadoCuentaCFooter;

  public dataSource = new MatTableDataSource(this.data);
  public showSpinner = false;

  displayColumns = ['periodo','debitoTasa','debitoMulta','creditoTasa','creditoMulta','excedente','saldoTasa','saldoMulta','saldo','acciones'];
  displayColumnsFooter= ['total','saldoTasa','saldoMulta','saldo'];

  search: string = '';
  viewTransation = true;

	iduVehiculo : string;
	idTasa : string;
	tipoTasa : string;
  periodo: string;

  constructor(private router: Router, 
              private activatedRoute: ActivatedRoute,
              public cuentaCorrienteSvc: EstadoCuentaCorrienteService,
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
			this.iduVehiculo = this.activatedRoute.snapshot.paramMap.get('iduVehiculo');
			this.tipoTasa = this.activatedRoute.snapshot.paramMap.get('tipoTasa');
			this.idTasa = this.activatedRoute.snapshot.paramMap.get('idTasa');
      this.periodo = '0';
      this.cargarData();
  }

  cargarData(){

    this.showSpinner = true;
    const filtro = {} as EstadoCuentaVehiFilter;               

    filtro.idConcepto = +this.idTasa;
    filtro.iduVehiculo = +this.iduVehiculo;

    this.cuentaCorrienteSvc.getEstadoCuentaVehiculoUsingPOST(filtro).subscribe({
      next:(data) =>{
        this.footer = data.footer;
        this.encabezado = data.encabezado;
        this.data = data.dataTable;        
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) =>{
        this.toastr.error(err);
        this.showSpinner = false
      },
      complete: () => (this.showSpinner = false),
    });
  }

  applyFilterSearch(event: string): void {
		this.dataSource.filter = event;
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

  openDetail(periodo){    
    this.viewTransation = false;
    this.periodo = periodo;
  }

  goBack(): void {		
		this.router.navigateByUrl('/consultas/bancarias/consulta-cuenta-corriente/1');
	}

}
