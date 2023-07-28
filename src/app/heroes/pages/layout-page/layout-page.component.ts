import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ];

  constructor( 
    private _authService: AuthService,
    private _router: Router, 
  ) {}

  get currentUser(): User | undefined {
    return this._authService.currentUser;
  }

  onLogout() {
    this._authService.logout();
    this._router.navigateByUrl('/auth/login');
  }

}
