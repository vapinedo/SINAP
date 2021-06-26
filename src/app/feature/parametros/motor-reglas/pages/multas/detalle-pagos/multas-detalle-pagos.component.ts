import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-multas-detalle-pagos',
  templateUrl: './multas-detalle-pagos.component.html',
  styleUrls: ['./multas-detalle-pagos.component.scss']
})
export class MultasDetallePagosComponent implements OnInit, AfterViewInit {

  @Input() dataFromModalWindow: any;

  public showSpinner = false;
  public showProgressBar = false;

  lstCuotasMulta: any[] = [];
  
  public dataSource;
  
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayColumns = ['mes', 'valor'];

  
  constructor() { }

  ngOnInit(): void {
    this.lstCuotasMulta = this.dataFromModalWindow.cuotasMulta;
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
