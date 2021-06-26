import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { CasosAmnistiaRoutingModule } from './casos-amnistia-routing.module';

import { ExoneradosAdminComponent } from './pages/exonerados/exonerados-admin.component';
import { PrescripcionesAdminComponent } from './pages/prescripciones/prescripciones-admin.component';
import { PrescripcionesCrearComponent } from './pages/prescripciones/prescripciones-crear/prescripciones-crear.component';
import { PrescripcionesModificarComponent } from './pages/prescripciones/prescripciones-modificar/prescripciones-modificar.component';
import { PrescripcionesDetalleComponent } from './pages/prescripciones/prescripciones-detalle/prescripciones-detalle.component';
import { PrescripcionesEliminarComponent } from './pages/prescripciones/prescripciones-eliminar/prescripciones-eliminar.component';

const modules = [
  CommonModule,
  SharedModule,
  CasosAmnistiaRoutingModule
];

const components = [
  ExoneradosAdminComponent,
  PrescripcionesAdminComponent
];

@NgModule({
  declarations: [components, PrescripcionesCrearComponent, PrescripcionesModificarComponent, PrescripcionesDetalleComponent, PrescripcionesEliminarComponent],
  exports: [components],
  imports: [modules]
})
export class CasosAmnistiaModule { }
