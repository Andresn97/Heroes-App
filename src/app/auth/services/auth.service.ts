
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { User } from '../interfaces/user.interface';
import { environments } from 'src/app/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor( private _http: HttpClient ) {}

  get currentUser(): User | undefined {
    if ( !this.user ) return undefined;

    return structuredClone( this.user );
  }

  login( email: string, password: string ): Observable<User> {
    return this._http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', user.id.toString()) )
      );
  }

  checkAuthentication(): Observable<boolean> {
    if ( !localStorage.getItem('token') ) return of(false);

    // const token = localStorage.getItem('token');
    // Token is required for to get user information
    return this._http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user),
        catchError( err => of(false) )
      );

  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}