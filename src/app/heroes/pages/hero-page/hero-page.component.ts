import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';


@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor( 
    private _heroesService: HeroesService, 
    private _activatedRoute: ActivatedRoute,  
    private _router: Router,  
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this._heroesService.getHeroById(id) ),
    )
    .subscribe(
      hero => {
        if ( !hero ) this._router.navigate(['/heroes/list']);
      
        this.hero = hero;
      }
    )
  }

  returnToList() {
    this._router.navigateByUrl('/heroes/list');
  }

}
