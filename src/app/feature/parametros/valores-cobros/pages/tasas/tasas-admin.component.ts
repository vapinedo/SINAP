import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from '@core/services/message.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DatosDePruebaService } from '@core/services/datos-de-prueba.service';

@Component({
  selector: 'app-tasas-admin',
  templateUrl: './tasas-admin.component.html',
  styleUrls: ['./tasas-admin.component.scss']
})
export class TasasAdminComponent implements OnInit, OnDestroy {

  private subscription1 = new Subscription();

  public dataSource: any;
  public showSpinner = false;
  public showProgressBar = false;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatTable) table!: MatTable<any>;
  selection = new SelectionModel<any>(true, []);
  displayColumns = ['campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'id'];

  constructor(
    private messageSvc: MessageService,
    private datosDePruebaSvc: DatosDePruebaService
  ) { }

  ngOnInit(): void {
    this.showSpinner = true;

    this.subscription1 = this.datosDePruebaSvc.getAll()
      .subscribe({
        next: data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        },
        error: err => this.messageSvc.errorToast(err),
        complete: () => this.showSpinner = false
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
  }
}