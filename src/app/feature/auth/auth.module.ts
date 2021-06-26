import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const modules = [
  CommonModule, 
  SharedModule,
  AuthRoutingModule
];

const components = [
  LoginComponent,
  NavbarComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class AuthModule { }
