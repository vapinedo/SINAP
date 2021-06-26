import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from '@core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public authError = false;
  public subscription = new Subscription();
  public logo = '../../../assets/img/logo.png';
  public bgImage = '../../../assets/img/bg-login.jpg';
  readonly VALID_EMAIL_STRING = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.VALID_EMAIL_STRING)]],
    password: ['', [Validators.required]]
  }); 

  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private messageSvc: MessageService,
  ) {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }  

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log(email, password);
    }
    return;
  }

}