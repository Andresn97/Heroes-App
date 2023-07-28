import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters:       new FormControl<string>(''),
    alt_img:          new FormControl<string>(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor( 
    private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute, 
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if ( !this._router.url.includes('edit') ) return;

    this._activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this._heroesService.getHeroById( id ) )
      ).subscribe( hero => {
        if ( !hero ) this._router.navigateByUrl('/');

        this.heroForm.reset( hero );
      })
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {

    if ( this.heroForm.invalid ) return;

    if ( this.currentHero.id ) {
      this._heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          this._router.navigateByUrl('/');
          this.showSnackbar(`${ hero.superhero } updated!`);
        });
      return
    }
    
    this._heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        this._router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar(`${ hero.superhero } created`);
      });

  }

  onDeleteHero() {

    if( !this.currentHero ) throw Error('Hero id is required');

      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        data: this.heroForm.value,
      });

      dialogRef.afterClosed()
        .pipe(
          filter( (result: boolean) => result ),
          switchMap( () => this._heroesService.deleteHero( this.currentHero.id )),
          filter( (wasDeleted: boolean) => wasDeleted),
        )  
        .subscribe( () => {
          this._router.navigateByUrl('/');
        });
    
  }

  showSnackbar( message: string ): void {
    this._snackbar.open( message, 'done', {
      duration: 2500
    });
  }

}
