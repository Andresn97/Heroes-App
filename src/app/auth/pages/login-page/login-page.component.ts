import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor( 
    private _authService: AuthService,
    private _router: Router 
  ) { }

  onLogin(): void {
    this._authService.login( 'andres@gmail.com', '1234' )
      .subscribe( user => {
        this._router.navigateByUrl('/')
      })
  }

}
