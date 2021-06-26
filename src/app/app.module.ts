import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ParametrosComponent } from '@feature/parametros/parametros.component';
import { ConsultasComponent } from '@feature/consultas/consultas.component';

@NgModule({
  declarations: [
    AppComponent,
    ParametrosComponent,
				ConsultasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SharedModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'HNL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
