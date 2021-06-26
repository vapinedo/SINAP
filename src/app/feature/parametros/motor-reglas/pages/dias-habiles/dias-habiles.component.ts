import { Component, Injectable, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { VentanaModalComponent } from '@feature/parametros/valores-cobros/components/ventana-modal/ventana-modal.component';
import { SubSink } from 'subsink';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '@core/services/message.service';
import { CalendarDateFormatter, CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { ParFeriadoService } from '@core/api/services';
import { ToastrService } from 'ngx-toastr';
import { HolidayCard } from '@core/api/models/holiday-card';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { DateFormatterCalendar } from '@core/utils/DateFormatterCalendar';
import { EliminarEventoComponent } from './eliminar-evento/eliminar-evento.component';
import { HolidayToEvent } from '@core/api/models';
import { startOfDay } from 'date-fns';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DATE_FORMAT_SEARCH } from '@core/utils/Patterns';
import { CustomDateFormatter } from './custom-date-formatter.provider';


export class ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  idDepartamento: number;
  idMunicipio: number;
  codBanco: number;
  idEntidad: number;
  numeroEventos: number;
};

@Component({
  selector: 'app-dias-habiles',
  templateUrl: './dias-habiles.component.html',
  styleUrls: ['./dias-habiles.component.scss'],
  providers: [
    {      
      provide: CalendarDateFormatter,            
      useClass: CustomDateFormatter
    }
  ],
})
export class DiasHabilesComponent implements OnInit {

  @ViewChild('inputSearchCalendar') private inputSearchCalendar;
  @ViewChild('treeComponent') private tree;

  //Variables MatTree tarjetas  
  private _transformer = (node: any, level: number) => {
    let element = {
      expandable: !!node.children && node.children.length > 0,
      name: node.nombre,
      level: level,
      idDepartamento: node.idDepartamento,
      idMunicipio: node.idMunicipio,
      codBanco: node.codBanco,
      idEntidad: node.idEntidad,
      numeroEventos: node.numeroEventos
    };
    return element;
  }
  hasNoContent = (_: number, _nodeData: ExampleFlatNode) => _nodeData.name === '';
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  checklistSelection = new SelectionModel<ExampleFlatNode>(true);
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataChange = new BehaviorSubject<HolidayCard[]>([]);
  //-------------------------------------------------------------------------------
  //CALENDAR
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;
  yesterday: Date;
  locale: string = 'Es';
  //-------------------------------------------------------------------------------

  subs = new SubSink();
  showSpinner = false;
  lugares: HolidayCard[];
  selectNode: ExampleFlatNode;
  eventsSelected: Array<HolidayToEvent>;
  opcionesFiltro = ['Nombre','Fecha'];
  formulario: FormGroup;
  placeholder: String = "";
  nodeSelected: any;

  constructor(public dialog: MatDialog,        
    private feriadoService: ParFeriadoService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.initializeYesterday();
  }

  ngOnInit(): void {
    this.getPlaces();
    this.events = [];
    this.formulario = this.formBuilder.group({
			filtroCalendar: new FormControl('', []),
      inputSearchCalendar: new FormControl('', [])
		});
  }

  getPlaces() {
    this.showSpinner = true;
    this.subs.add(
      this.feriadoService.getHolidayCardsUsingGET()
        .subscribe({
          next: data => {
            this.lugares = data;
            this.dataSource.data = this.lugares;
            this.dataChange.next(this.lugares);                 
          },
          error: err => {
            this.toastr.error(err || 'No se ha logrado consultar los municipios, departamentos y bancos');
          },
          complete: () => {
            this.showSpinner = false;            
          }
        })
    );
  }

  openCreateEvent() {    

    const dialogRef = this.dialog.open(CrearEventoComponent, {
      data: this.selectNode,                               
		});

    this.subs.add(
      dialogRef.afterClosed().subscribe(result => {             
        if(result){
          this.initializeEvents();  
          this.updateEventCreate();
        }        
      })
    );
  }

  editEvent(event) {

    let selected = this.eventsSelected.filter(item => item.id == event[0].id);

    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '30vw',
      disableClose: true,
      data: {
        dataComponent: {
          oneButtonAction: true,
          title: 'Editar evento de: ' + this.selectNode.name,
          node: selected[0]
        },
        component: EditarEventoComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.cleanEvents();
          this.initializeEvents();        
        }        
      })
    );
  }

  deleteEvent(event) {    

    const dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '30vw',
      disableClose: true,
      data: {
        dataComponent: {
          oneButtonAction: true,
          title: 'Eliminar evento',
          id: event[0].id
        },
        component: EliminarEventoComponent
      }
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.cleanEvents();
          this.initializeEvents();   
          this.updateEventDelete();     
        }         
      })
    );    
  }

  seleccionarNodoPadre(node: any, event: any) {    
    
    this.checklistSelection.toggle(node);        

    if (event.checked) {      
      this.selectNode = node;
      this.initializeEvents();
    } else {
      this.selectNode = null;
      this.cleanEvents();
    }
  }

  seleccionarNodoHijo(node: any, event: any) {    

    this.todoItemSelectionToggle(node);

    if (event.checked) {      
      this.selectNode = node;
      this.initializeEvents();
    } else {
      this.selectNode = null;
      this.cleanEvents();
    }
  }

  descendantsAllSelected(node: ExampleFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  descendantsPartiallySelected(node: ExampleFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: ExampleFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

  filterChanged(filterText: string) {
    if (filterText.length >= 2) {
      this.filterTree(filterText);
      if (filterText) {
        this.treeControl.expandAll();
      } else {
        this.treeControl.collapseAll();
      }
    } else {
      this.dataSource.data = this.lugares;
    }
  }

  filterTree(filterText: string) {        
    let filteredTreeData = [];
    if (filterText) {
      this.lugares.forEach(item => {
        if (item.nombre.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1) {
          filteredTreeData.push(item);
        } else if (item.children) {
          item.children.forEach(depto => {
            if (depto.nombre.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1) {
              filteredTreeData.push(depto);
            } else if (depto.children) {
              let municipios = [];
              depto.children.forEach(mun => {
                if (mun.nombre.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1) {
                  municipios.push(mun);
                }
              });
              if (municipios.length > 0) {
                depto.children = municipios;
                filteredTreeData.push(depto);
              }
            }
          });
        }
      });
      this.dataSource.data = filteredTreeData;
    } else {
      this.dataSource.data = this.lugares;
    }
  }

  cleanEvents() {
    this.events = [];
  }

  //CALENDAR

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {


  }

  handleEvent(action: string, event: CalendarEvent) {
    console.log(event);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  initializeEvents() {        
    this.showSpinner = true;
    let cardSelected = this.selectNode;

    if (cardSelected) {
      let nacional = 'N';
      if (!cardSelected.idMunicipio && !cardSelected.idDepartamento
        && !cardSelected.codBanco && !cardSelected.idEntidad) {
        nacional = 'S';
      }
      let request: ParFeriadoService.GetHolidayToEventsUsingGETParams = {
        nacional: nacional,
        idMunicipio: cardSelected.idMunicipio,
        idEntidad: cardSelected.idEntidad,
        idDepartamento: cardSelected.idDepartamento,
        codBanco: cardSelected.codBanco,
      }

      this.subs.add(
        this.feriadoService.getHolidayToEventsUsingGET(request)
          .subscribe({
            next: data => {
              this.eventsSelected = data;
              this.cargarEventos(data);
            },
            error: err => {
              this.toastr.error(err || 'No se ha logrado consultar los eventos solicitados');
            },
            complete: () => this.showSpinner = false
          })
      );
    }
  }

  cargarEventos(eventos: HolidayToEvent[]) {

    eventos.forEach(item => {
      this.events = [
        ...this.events,
        {
          id: item.id,
          title: item.nombre,
          start: startOfDay(new Date(item.fecha))
        }
      ]
    });
  }

  private initializeYesterday() {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }


  calendarNextYear() {
    let newDate = this.viewDate;
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();
    this.viewDate = new Date(year + 1, month, day);
  }

  calendarPreviusYear() {
    let newDate = this.viewDate;
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();
    this.viewDate = new Date(year - 1, month, day);
  }

  filterCalendar(event) {    
    if(this.formulario.get("filtroCalendar").value === "Nombre"){
      this.events.forEach(item =>{
        if(item.title.toUpperCase() === event.toUpperCase()){
          this.viewDate = item.start;
        }
      });
    }else if (this.formulario.get("filtroCalendar").value === "Fecha"){
      if(this.formulario.valid && this.formulario.get("inputSearchCalendar").value !== ""){
        let fecha = new Date(event);
        this.viewDate = fecha;        
      }      
    }
  }

  changeFilter(){    
    if(this.formulario.get("filtroCalendar").value === "Nombre"){
      this.placeholder = "Nombre";      
      this.formulario.get("inputSearchCalendar").clearValidators();
    }else if (this.formulario.get("filtroCalendar").value === "Fecha"){
      this.placeholder = "AAAA/MM/DD";
      this.formulario.get("inputSearchCalendar").setValidators([Validators.pattern(DATE_FORMAT_SEARCH)]);     
    }       
    this.formulario.get("inputSearchCalendar").setValue("");
    this.formulario.get("inputSearchCalendar").updateValueAndValidity();
  }  

  updateEventDelete(){    
    this.selectNode.numeroEventos-=1;       
  }
  updateEventCreate(){    
    this.selectNode.numeroEventos+=1;       
  }

}
