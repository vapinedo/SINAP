import { Injectable } from '@angular/core';

import { User } from '@core/models/user.model';

@Injectable()
export class AuthService {

  private UserArr: User[]; 
  private collection = 'users';
  private endPoint = 'https://portafolioangular-135a6.firebaseio.com';

  constructor() { }

}