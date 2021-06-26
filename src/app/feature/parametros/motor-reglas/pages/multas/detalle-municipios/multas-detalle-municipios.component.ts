import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-multas-detalle-municipios',
  templateUrl: './multas-detalle-municipios.component.html',
  styleUrls: ['./multas-detalle-municipios.component.scss']
})
export class MultasDetalleMunicipiosComponent implements OnInit {

  @Input() dataFromModalWindow: any;

  public showSpinner = false;
  public showProgressBar = false;

  lstCuotasMulta: any[] = [];
  
  public dataSource;
  
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayColumns = ['nombreDepartamento', 'nombreMunicipio'];

  
  constructor() { }

  ngOnInit(): void {
    this.lstCuotasMulta = this.dataFromModalWindow.cuotasMulta;
    this.lstCuotasMulta.forEach(cuota => {
      cuota.municipio = cuota?.tnParMultaMunicipioPK?.municipio;
      cuota.departamento = cuota?.tnParMultaMunicipioPK?.departamento;
    });
    this.lstCuotasMulta.sort((n1, n2) => {
      return n1.nombreDepartamento.localeCompare(n2.nombreDepartamento)
      || n1.nombreMunicipio.localeCompare(n2.nombreMunicipio)
    });
    this.dataSource = new MatTableDataSource(this.lstCuotasMulta);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(){
    this.dataSource = new MatTableDataSource(this.lstCuotasMulta);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
