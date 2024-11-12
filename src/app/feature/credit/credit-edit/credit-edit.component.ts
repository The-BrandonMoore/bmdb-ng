import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Actor } from '../../../model/actor.class';
import { Credit } from '../../../model/credit.class';
import { Movie } from '../../../model/movie.class';
import { ActorService } from '../../../service/actor.service';
import { CreditService } from '../../../service/credit.service';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-credit-edit',
  templateUrl: './credit-edit.component.html',
  styleUrl: './credit-edit.component.css',
})
export class CreditEditComponent implements OnInit, OnDestroy {
  title: string = 'Credit Edit';
  credit: Credit = new Credit();
  creditId!: number;
  subscription!: Subscription;
  movies: Movie[] = [];
  actors: Actor[] = [];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 11/05/24 - consider combining getting movieId and getting movie in movie-edit as below
    //get id from URL and set creditId
    this.actRoute.params.subscribe((parms) => {
      this.creditId = parms['id'];
      //get credit first, from creditId
      this.subscription = this.creditSvc.getById(this.creditId).subscribe({
        next: (resp) => {
          //set credit value with response from the subscription to GetById
          this.credit = resp;
        },
        error: (err) => {
          console.error(
            'error getting credit for id: : ' +
              this.creditId +
              '. Error: ' +
              err
          );
        },
      });
    });
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

  save() {
    this.credit.actorId = this.credit.actor.id;
    this.credit.movieId = this.credit.movie.id;
    this.subscription = this.creditSvc.editCredit(this.credit).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.error('Error updating credit: ' + err.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  compMovie(a: Movie, b: Movie): boolean {
    return a && b && a.id == b.id;
  }
  compActor(a: Actor, b: Actor): boolean {
    return a && b && a.id == b.id;
  }
}
