
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { environments } from 'src/app/environments/environments';
import { Hero } from '../interfaces/hero.interface';



@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor( private _http: HttpClient ) {}

  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroById( id: string ): Observable<Hero|undefined> {
    return this._http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
    .pipe(
      catchError( err => of(undefined) )
    );
  }

  getSuggestions( query: string ): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&limit=6`);
  }

}