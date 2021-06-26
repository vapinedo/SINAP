import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Inteceptores y guardias
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { SetHeadersService } from './interceptors/set-headers.service';

// Servicios utilitarios
import { MessageService } from './services/message.service';
import { DatetimeService } from './services/datetime.service';
import { StorageService } from './services/storage.service';
import { SidebarService } from './services/sidebar.service';

// Autenticacion
import { AuthService } from './services/auth.service';

// Parametros
// Modulo Valores Cobros
import { MultaService } from './services/parametros/valores-cobros/multa.service';

// Servicio de prueba
import { DatosDePruebaService } from './services/datos-de-prueba.service';
import { PrescripcionService } from './services/prescripcion.service';
import { FiltrosTablaService } from './services/filtros-tabla.service';
import { DivisionPoliticaService } from './services/division-politica.service';
import { ConceptoDebitoService } from './services/parametros/valores-cobros/concepto-debito.service';
import { SpinnerService } from './services/spinner.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    MessageService,
    DatetimeService,
    AuthService,
    StorageService,
    SidebarService,
    MultaService,
    PrescripcionService,
    DatosDePruebaService,
    FiltrosTablaService,
    DivisionPoliticaService,
    ConceptoDebitoService,
    SpinnerService,

    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetHeadersService,
      multi: true
    }
  ]
})
export class CoreModule { }
