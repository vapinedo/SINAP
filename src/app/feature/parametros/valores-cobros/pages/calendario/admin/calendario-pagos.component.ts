import { Component, OnInit, ViewChild } from '@angular/core';

import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ItemMenu } from '@core/api/models/item-menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CalendarioPagoService, ConceptoService, PlateClassService } from '@core/api/services';
import { PayCalendarToTable } from '@core/api/models/pay-calendar-to-table';
import { CalendarioEditarComponent } from '../editar/calendario-editar.component';
import { CalendarioPagosDetalleComponent } from '@feature/parametros/valores-cobros/pages/calendario/detalle/calendario-pagos-detalle.component';
import { CalendarioPagosCrearComponent } from '@feature/parametros/valores-cobros/pages/calendario/crear/calendario-pagos-crear.component';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { Meses } from '@core/models/Meses';
import { PlateClassDTO } from '../../../../../../core/api/models/plate-class-dto';

@Component({
  selector: 'app-calendario-pagos',
  templateUrl: './calendario-pagos.component.html',
  styleUrls: ['./calendario-pagos.component.scss']
})
export class CalendarioPagosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subs = new SubSink();

  displayColumns = ['nombre', 'conceptoCobro', 'mes', 'placas', 'clasePlaca', 'fechaPago', 'estado', 'acciones'];

  data: PayCalendarToTable[] = [];
  dataBackup: PayCalendarToTable[] = [];
  public dataSource = new MatTableDataSource(this.data);
  public showSpinner = false;

  search: string = '';
  selectConcept: string;
  selectMonth: string;
  selectPlate: string;
  selectClassPlate: string;
  months: string[] = [];
  plates: number[] = [];
  classPlates: PlateClassDTO[] = [];
  concepts: ItemMenu[] = [];


  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private ConceptoService: ConceptoService,
    private calendarioPagoSvc: CalendarioPagoService,
    private plateClassService: PlateClassService,
  ) { }

  ngOnInit(): void {
    this.months.push(...Object.keys(Meses));
    this.plates.push(...Array(10).keys());
    this.getCelendars();
    this.getConcepts();
    this.getClassPlates();
  }

  getCelendars() {
    this.showSpinner = true;

    this.subs.add(
      this.calendarioPagoSvc.findAllPayCalendarUsingGET()
        .subscribe({
          next: data => {
            this.data = data;
            this.dataBackup = data;
            this.data.forEach(x => x.fechaPago = x.fechaPago?.split('-').join('/'));
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            if (data.length <= 0) {
              this.toastr.error('No hay información que coincida con los criterios ingresados');
            }
          },
          error: err => {
            this.toastr.error(err || 'No se ha logrado consultar el listado de calendarios de pago creados');
            this.showSpinner = false;
          },
          complete: () => this.showSpinner = false
        })
    );

  }

  /**
   * Autor: Jhonnatan Sanchez
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.6.02
   * Fecha: 23/February/2021
   * Descripción: Este metodo sirve para aplicar el filtro en la tabla de consulta
   */
  applyFilterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Autor: Jhonnatan Sanchez
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.6.02
   * Fecha: 23/February/2021
   * Descripción: Este metodo sirve para aplicar el filtro por campos presente en la pantalla
   */
  applyFilter() {
    this.data = [];
    this.search = '';
    this.data = this.dataBackup.filter(x => {
      let mathMonth = true;
      let mathPlate = true;
      let mathClassPlate = true;
      let mathConcept = true;

      if (this.selectMonth) {
        mathMonth = x.mes.toString().trim().toLowerCase() === this.selectMonth.toString().trim().toLowerCase();
      }
      if (this.selectPlate || Number(this.selectPlate) === 0) {
        mathPlate = x.placas.filter(plate => {
          return plate?.toString() === this.selectPlate?.toString();
        }).length > 0;
      }
      if (this.selectClassPlate) {
        mathClassPlate = x.clasePlaca.filter(classPlate => {
          return classPlate?.trim().toLowerCase() === this.selectClassPlate?.toString().trim().toLowerCase()
        }).length > 0;
      }
      if (this.selectConcept) {
        mathConcept = x.conceptoCobro?.toString().trim().toLowerCase()
          === this.selectConcept.toString().trim().toLowerCase();
      }

      return mathMonth && mathPlate && mathClassPlate && mathConcept;
    });

    if (this.data.length <= 0) {
      this.toastr.error('No hay información que coincida con los criterios ingresados');
    }

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cleanFilterValidator(): boolean {
    return !(this.selectConcept || this.selectMonth ||
      this.selectPlate || Number(this.selectPlate) === 0 || this.selectClassPlate);
  }

  /**
   * Autor: Jhonnatan Sanchez
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.6.02
   * Fecha: 23/February/2021
   * Descripción: Este metodo sirve para limpiar los filtros por campo aplicados a la tabla,
   * ademas devuelve la data de la tabla a su contenido original
   */
  cleanFilters() {
    this.data = this.dataBackup;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.selectConcept = undefined;
    this.selectMonth = undefined;
    this.selectPlate = undefined;
    this.selectClassPlate = undefined;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = '';
  }

  /**
   * Autor: Jhonnatan Sanchez
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.6.02
   * Fecha: 22/February/2021
   * Descripción: Este metodo sirve abrir el modal con el formulario de creación
   */
  openCreateForm() {
    const dialogRef = this.dialog.open(CalendarioPagosCrearComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.getCelendars();      
    })

  }

  /**
 * Autor: Victor Pinedo
 * Empresa: Asesoftware
 * Requerimiento: Sprint_01 - HU_1.6.02
 * Fecha: 02/March/2021
 * Descripción: Editar multa
 */
  onEdit(id: number) {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '55vw',
      disableClose: true,
      data: {
        dataComponent: { id, title: 'Calendario de Pago editar' },
        component: CalendarioEditarComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed()
        .subscribe(success => {
									if (success) {
            this.getCelendars();
          }
        })
    )
  }



  /**
   * Autor: Jhonnatan Sanchez
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.6.02
   * Fecha: 23/February/2021
   * Descripción: Este metodo sirve abrir el modal con el detalle del calendario
   */
  openDetail(id: number) {
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '45vw',
      disableClose: true,
      data: {
        dataComponent: {
          oneButtonAction: true,
          title: 'Visualizar calendario de pago',
          id
        },
        component: CalendarioPagosDetalleComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.onEdit(result);
        }
      })
    );
  }

  /**
   * Autor: Jhonnatan Sanchez
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.6.02
   * Fecha: 23/February/2021
   * Descripción: Este metodo sirve para consultar la lista de conceptos de debito activos en el sistema
   */
  getConcepts() {
    this.subs.add(
      this.ConceptoService.getActiveConceptsDebitUsingGET()
        .subscribe({
          next: data => {
            this.concepts = data;
          },
          error: err => {
            this.toastr.error(err || 'No se ha logrado consultar el listado de conceptos a cobrar');
          }
        })
    );
  }

  /**
   * Autor: Jhonnatan Sanchez
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.6.02
   * Fecha: 23/February/2021
   * Descripción: Este metodo sirve para consultar la lista de conceptos de debito activos en el sistema
   */
  getClassPlates() {
    this.subs.add(
      this.plateClassService.getPlateClassUsingGET()
        .subscribe({
          next: data => {
            let orderPlates: PlateClassDTO[] = data.sort((n1,n2) => {
              if (n1.clase > n2.clase) {
                  return 1;
              }

              if (n1.clase < n2.clase) {
                  return -1;
              }

              return 0;
          });
            this.classPlates = orderPlates;
          },
          error: err => {
            this.toastr.error(err || 'No se ha logrado consultar el listado de conceptos a cobrar');
          }
        })
    );
  }

  /**
 * Autor: Victor Pinedo
 * Empresa: Asesoftware
 * Requerimiento: Sprint_01 - HU_1.7.3
 * Fecha: 02/March/2021
 * Descripción: Cancela todas las suscripciones activas en esta clase
 */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
