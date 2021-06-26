import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { MotorReglasRoutingModule } from './motor-reglas-routing.module';

import { NormativasAdminComponent } from './pages/normativas/normativas-admin.component';
import { ReglasSistemaAdminComponent } from './pages/reglas-sitema/reglas-sistema-admin.component';
import { NormativaCrearComponent } from './pages/normativas/normativa-crear/normativa-crear.component';
import { NormativaDetalleComponent } from './pages/normativas/normativa-detalle/normativa-detalle.component';
import { NormativaEliminarComponent } from './pages/normativas/normativa-eliminar/normativa-eliminar.component';
import { NormativaModificarComponent } from './pages/normativas/normativa-modificar/normativa-modificar.component';
import { VentanaModalComponent } from '../valores-cobros/components/ventana-modal/ventana-modal.component';
import { VigenciasAdminComponent } from './pages/vigencias/admin/vigencias-admin.component';
import { VigenciasCrearComponent } from './pages/vigencias/crear/vigencias-crear.component';
import { VigenciasDetalleComponent } from './pages/vigencias/detalle/vigencias-detalle.component';
import { VigenciasEditarComponent } from './pages/vigencias/editar/vigencias-editar.component';
import { VigenciasEliminarComponent } from './pages/vigencias/eliminar/vigencias-eliminar.component';

import { CalendarioComponent } from './pages/calendario/calendario.component';
import { DiasHabilesComponent } from './pages/dias-habiles/dias-habiles.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { CrearEventoComponent } from './pages/dias-habiles/crear-evento/crear-evento.component';

import { MultasAdminComponent } from './pages/multas/admin/multas-admin.component';
import { MultaCrearComponent } from './pages/multas/crear/multa-crear.component';
import { MultaEditarComponent } from './pages/multas/editar/multa-editar.component';
import { MultaDetalleComponent } from './pages/multas/detalle/multa-detalle.component';
import { FiltroTablaComponent } from './pages/multas/filtro-tabla-multa/filtro-tabla-multa.component';
import { MultaCrearParametrosComponent } from './pages/multas/crear-parametros/multa-crear-parametros.component';
import { MultasDetallePagosComponent } from './pages/multas/detalle-pagos/multas-detalle-pagos.component';
import { MultasDetalleMunicipiosComponent } from './pages/multas/detalle-municipios/multas-detalle-municipios.component';



import { DiasNoHabilesComponent } from './pages/dias-no-habiles/dias-no-habiles.component';
import { SalarioMinimoComponent } from './pages/salario-minimo/salario-minimo.component';
import { DiasAdicionalesComponent } from './pages/dias-adicionales/dias-adicionales.component';
import { MultaAsociarMunicipiosComponent } from './pages/multas/asociar-municipios/multa-asociar-municipios.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EditarEventoComponent } from './pages/dias-habiles/editar-evento/editar-evento.component';
import { EliminarEventoComponent } from './pages/dias-habiles/eliminar-evento/eliminar-evento.component';
import { MultaEliminarComponent } from './pages/multas/eliminar/multa-eliminar.component';

const modules = [
  CommonModule,
  SharedModule,
  MotorReglasRoutingModule,
  MatTreeModule,
  MatIconModule, 
  MatButtonModule,
  CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
];

const components = [
  ReglasSistemaAdminComponent,
  NormativasAdminComponent,
  ReglasSistemaAdminComponent,
  NormativaCrearComponent,
  NormativaDetalleComponent, 
  NormativaEliminarComponent,
  NormativaModificarComponent,
  CalendarioComponent,
  //Vigencias
  VigenciasAdminComponent, 
  VigenciasCrearComponent,
  VigenciasDetalleComponent, 
  VigenciasEditarComponent, 
  VigenciasEliminarComponent,
  //Dias habiles
  DiasHabilesComponent,
  CrearEventoComponent,
  EditarEventoComponent, 
  EliminarEventoComponent,
  DiasNoHabilesComponent,
  //Salario minimo
  SalarioMinimoComponent,
  //Dias adicionales
  DiasAdicionalesComponent,
    // Multas
  MultasAdminComponent,
  MultaCrearComponent,
  MultaEditarComponent,
  MultaDetalleComponent,
  FiltroTablaComponent,
  MultaCrearParametrosComponent,
  MultasDetallePagosComponent,
  MultasDetalleMunicipiosComponent,
  MultaAsociarMunicipiosComponent,
  MultaEliminarComponent
     
  
];

const entryComponents = [
  VentanaModalComponent
  
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules],
  entryComponents:[entryComponents]
})
export class MotorReglasModule { }
