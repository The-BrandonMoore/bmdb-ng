import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Credit } from '../../../model/credit.class';
import { CreditService } from '../../../service/credit.service';
import { Movie } from '../../../model/movie.class';
import { MovieService } from '../../../service/movie.service';
import { Actor } from '../../../model/actor.class';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrl: './credit-create.component.css',
})
export class CreditCreateComponent implements OnInit, OnDestroy {
  title: string = 'Credit Create';
  newCredit: Credit = new Credit();
  subscription!: Subscription;
  movies: Movie[] = [];
  actors: Actor[] = [];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //populate list of movies
    this.subscription = this.movieSvc.list().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading movies.' + err.message
        );
      },
    });
    //populate list of actors
    this.subscription = this.actorSvc.list().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading actors.' + err.message
        );
      },
    });
  }

  addCredit(): void {
    console.log('Add Credit', this.newCredit);

    this.subscription = this.creditSvc.add(this.newCredit).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.error('Error creating credit: ' + err.message);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
