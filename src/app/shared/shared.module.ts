import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'angular-crumbs';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { MainmenuComponent } from './components/sidebar/mainmenu/mainmenu.component';
import { SubmenuComponent } from './components/sidebar/submenu/submenu.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/loaders/spinner.component';
import { ProgressbarComponent } from './components/loaders/progressbar.component';
import { FacebookLoaderComponent } from './components/loaders/facebook-loader.component';
import { NotificationsMenuComponent } from './components/notifications-menu/notifications-menu.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoaderComponent } from './components/loader/loader.component';

// pipes
import { CapitalizarPipe } from './pipes/capitalizar.pipe';

const modules = [
  CommonModule,
  ToastrModule,
  RouterModule,
  MaterialModule,
  BreadcrumbModule,
  ReactiveFormsModule,
  FormsModule,
  ToastrModule.forRoot({
    maxOpened: 3,
    autoDismiss: true,
    timeOut: 5000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    })
];

const components = [
  HeaderComponent,
  BreadcrumbsComponent,
  MainmenuComponent,
  SubmenuComponent,
  FooterComponent,
  SpinnerComponent,
  ProgressbarComponent,
  FacebookLoaderComponent,
  NotificationsMenuComponent,  
  LoaderComponent,
  ConfirmationDialogComponent,
  // pipes
  CapitalizarPipe
];

registerLocaleData(localeEs);

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [components, modules]
})
export class SharedModule { }