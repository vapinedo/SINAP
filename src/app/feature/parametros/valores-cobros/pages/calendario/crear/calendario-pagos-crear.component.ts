import { Component, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Meses } from '@core/models/Meses';
import { ItemMenu } from '@core/api/models/item-menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { PlateClassDTO } from '@core/api/models/plate-class-dto';
import { PlateCalendarPay } from '@core/api/models/plate-calendar-pay';
import { PayCalendarCreate } from '@core/api/models/pay-calendar-create';
import { PlateClassCalendarPay } from '@core/api/models/plate-class-calendar-pay';
import { CalendarioPagoService, ConceptoService, PlateClassService } from '@core/api/services';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { compareDate } from '@core/utils/FunctionDates';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatOption } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { default as _rollupMoment } from 'moment';
import * as _moment from 'moment';
import { NON_WHITE_SPACE_REG_EXP } from '@core/utils/Patterns';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
	parse: {
		dateInput: 'YYYY/MM/DD',
	},
	display: {
		dateInput: 'YYYY/MM/DD',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};


@Component({
  selector: 'app-calendario-pago-crear',
  templateUrl: './calendario-pagos-crear.component.html',
  styleUrls: ['./calendario-pagos-crear.component.scss'],
  providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},

		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class CalendarioPagosCrearComponent implements OnInit {
  
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('allSelectedConcepts') private allSelectedConcepts: MatOption;  
  @ViewChild('defaultClass') private defaultClass: MatOption;  

  public showSpinner = false;

  mesesList: string[]=[];
  placasList: number[]=[];
  concepts: ItemMenu[] = [];
  calendarCreate: PayCalendarCreate;
  plateClass : PlateClassDTO[] = [];
  numbers: number[] = [0,1,2,3,4,5,6,7,8,9];
  selected:any;

  private subscription1 = new Subscription();
  private subscription2 = new Subscription();


  public form = this.fb.group({
    conceptoCobro:  ['', [Validators.required]],
    nombre:         ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(100),
                          Validators.pattern(NON_WHITE_SPACE_REG_EXP)                
                    ]],
    mes:            ['', [Validators.required]],
    fechaInicio:    ['', [Validators.required]],
    fechaFin:       ['', [Validators.required]],    
    tipoPlacas:     [[], [Validators.required]],
    placas:         [[], [Validators.required]],
    estado:         [true],
  }); 

  constructor(
    private fb: FormBuilder,     
    private toastr: ToastrService,
    private ConceptoService: ConceptoService,
    private plateClassSvc: PlateClassService,
    private calendarioPagoSvc: CalendarioPagoService,
    public  dialogRef: MatDialogRef<CalendarioPagosCrearComponent>,
    public dialog: MatDialog
  ) {
    dialogRef.disableClose = true;    
  } 
  
  ngOnInit(): void {
    this.getConcepts();
    this.getPlateClass();   
    this.getMeses();           
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  onSubmit(): void {
    
    if (this.form.valid) {
      this.showSpinner = true;  
      let request = {} as PayCalendarCreate;
      request.conceptoCobro = this.form.get('conceptoCobro').value;      
      request.estado = this.form.get('estado').value == true ? 'A' : 'I';
      request.fechaFin = this.form.get('fechaFin').value;
      request.fechaInicio = this.form.get('fechaInicio').value;
      request.mes = this.form.get('mes').value;
      request.nombre = this.form.get('nombre').value;
      let placas: Array<PlateCalendarPay> = [];
      let numbers = this.form.get('placas').value;
      numbers.forEach(function(item){
        let obj = {} as PlateCalendarPay;
        obj.noPlaca = item
        placas.push(obj);
      });
      
      let tipoPlacas: Array<PlateClassCalendarPay> = [];
      let tipo: string[] = this.form.get('tipoPlacas').value;
      tipo.forEach(function(item){
        let obj = {} as PlateClassCalendarPay;
        obj.clasePlaca = item
        tipoPlacas.push(obj);
      });

      request.clasePlacas = tipoPlacas;
      request.placasCalendario = placas;                  

      this.calendarioPagoSvc.createPayCalendarUsingPOST(request)
        .subscribe({
          next: (data) => {
            this.toastr.success('Calendario creado satisfactoriamente.');
						this.dialogRef.close();
          },
          complete: () => (this.showSpinner = false),
          error: (err) => {
						this.toastr.error(err);	            					
            this.showSpinner = false;
            console.log( this.form.get('placas').value)            ;
					},
        });            
    }
    return;
  }

  get conceptoCobro() { return this.form.get('conceptoCobro'); }  
  get mes() { return this.form.get('mes'); }  
  get fechaInicio() { return this.form.get('fechaInicio'); }  
  get fechaFin() { return this.form.get('fechaFin'); }      
  get tipoPlacas() { return this.form.get('tipoPlacas'); }  
  get placas() { return this.form.get('placas'); }  
  get estado() { return this.form.get('estado'); }   
  get nombre(){ return this.form.get('nombre'); }     

  validateDates(){
    const erroresFechaInicio = {};
		const erroresFechaFinal = {};
		let fechasInvalida = false;

    if (
			this.form.get("fechaInicio").value &&
			this.form.get("fechaFin").value
		){      
      if (compareDate(this.form.get("fechaInicio").value, this.form.get("fechaFin").value) == 1) {
        erroresFechaFinal['outRange1'] =
         'La fecha fin no puede ser menor a la fecha inicio';
        fechasInvalida = true;        
      } else {
        this.form.get("fechaFin").setErrors({ outRange1: null });
        this.form.get("fechaFin").updateValueAndValidity();
      }
  
      if (compareDate(this.form.get("fechaFin").value, this.form.get("fechaInicio").value) == 0) {
        erroresFechaInicio['outRange1'] =
          'La fecha inicio debe ser menor a la fecha fin'; 
        fechasInvalida = true;
      } else {
        this.form.get("fechaInicio").setErrors({ outRange1: null });
        this.form.get("fechaInicio").updateValueAndValidity();
      }

      for (const key in erroresFechaInicio) {
        this.form.get("fechaInicio").setErrors(erroresFechaInicio);
      }
  
      for (const key in erroresFechaFinal) {
        this.form.get("fechaFin").setErrors(erroresFechaFinal);
      }

    }   
  }

  tosslePerOne(all){ 
    this.defaultClass.deselect();

    if (this.allSelected.selected) {  
     this.allSelected.deselect();
     return false;
    }    
        
    if(this.form.get('tipoPlacas').value.length==this.plateClass.length)
       this.allSelected.select();
 
 }

  toggleAllSelection(){    
    if (this.allSelected.selected) {    
      this.form.get('tipoPlacas')
        .patchValue([...this.plateClass.map(item => item.clase), 0]);
    } else {
      this.form.get('tipoPlacas').patchValue([]);
    }    
  }

  tosslePerOneConcepto(all){ 
    if (this.allSelectedConcepts.selected) {  
     this.allSelectedConcepts.deselect();
     return false;
    }    
        
    if(this.form.get('conceptoCobro').value.length==this.concepts.length)
       this.allSelectedConcepts.select();
 
 }

  toggleAllSelectionConcepto(){    
    if (this.allSelectedConcepts.selected) {    
      this.form.get('conceptoCobro')
        .patchValue([...this.concepts.map(item => item.id), 0]);
    } else {
      this.form.get('conceptoCobro').patchValue([]);
    }    
  }

  selectPlaca(event, i){    
    if(event.checked && !this.placasList.includes(i)){
      this.placasList.push(i);
    }else if(!event.checked && this.placasList.includes(i)){
      this.placasList = this.placasList.filter(item => item !== i);      
    }

    this.form.get('placas').setValue(this.placasList);
  }

  /**
   * Autor: Daniel Moreno
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.7.1
   * Fecha: 01/March/2021
   * Descripción: Este metodo sirve para consultar la lista de conceptos de debito activos en el sistema
   */
  getConcepts(){
    this.subscription1 = this.ConceptoService.getActiveConceptsDebitCurrentUsingGET()
       .subscribe({
         next: data => {          
           this.concepts = data;           
         },
         error: err => {
           this.toastr.error(err || 'No se ha logrado consultar el listado de conceptos a cobrar');
         }
       });
   }

  /**
   * Autor: Daniel Moreno
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.7.1
   * Fecha: 01/March/2021
   * Descripción: Este metodo sirve para consultar la lista de los tipo de placa
   */
  getPlateClass(){
     this.subscription2 = this.plateClassSvc.getPlateClassUsingGET()
      .subscribe({
        next: data => {
          this.plateClass = data;                
        },
        error: err => {
          this.toastr.error(err || 'No se ha logrado consultar el listado de los tipos de placa');
        },
        complete: () =>   this.defaultClass.select()
      });
      
  }
  
  /**
   * Autor: Daniel Moreno
   * Empresa: Asesoftware
   * Requerimiento: Sprint_01 - HU_1.7.1
   * Fecha: 01/March/2021
   * Descripción: Este metodo sirve para armar la lista con los meses.
   */
  getMeses(){
    this.mesesList = Object.keys(Meses);    
  }

  onCloseDialog(): void {
		if (this.form.dirty) {
			this.showConfirmarSalir();
		} else {
			this.dialogRef.close();
		}
	}

  showConfirmarSalir(): void {
		this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Creación incompleta',
					mensaje: '¿Desea salir sin guardar la información?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.dialogRef.close();
				}
			});
	}

  showConfirmarCrear(): void {
		this.dialog
			.open(ConfirmationDialogComponent, {
				data: {
					titulo: 'Crear calendario de pago',
					mensaje: '¿Está seguro que quiere crear este calendario de pago?',
				},
			})
			.afterClosed()
			.subscribe((confirmado) => {
				if (confirmado) {
					this.onSubmit();
				}
			});
	}

}
