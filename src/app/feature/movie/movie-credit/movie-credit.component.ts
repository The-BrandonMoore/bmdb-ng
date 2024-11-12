import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie.class';
import { Credit } from '../../../model/credit.class';
import { MovieService } from '../../../service/movie.service';
import { CreditService } from '../../../service/credit.service';
import { ActorService } from '../../../service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-credit',
  templateUrl: './movie-credit.component.html',
  styleUrl: './movie-credit.component.css',
})
export class MovieCreditComponent implements OnInit, OnDestroy {
  title: string = 'Movie Credits';
  movie?: Movie;
  credits?: Credit[];
  movieId!: number;
  subscription?: Subscription;

  constructor(
    private movieSvc: MovieService,
    private creditSvc: CreditService,
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //get movieID from URL
    this.subscription = this.actRoute.params.subscribe({
      next: (parms) => {
        this.movieId = parms['movieId'];
        //get the movie for the movieId
        this.movieSvc.getById(this.movieId).subscribe({
          next: (resp) => {
            this.movie = resp;
          },
          error: (err) => {
            console.error(
              'Movie Credits: Error getting movie for Id: ' + this.movieId
            );
          },
        });
        //get credits for movie
        this.subscription = this.creditSvc
          .getByMovieId(this.movieId)
          .subscribe({
            next: (resp) => {
              this.credits = resp;
            },
            error: (err) => {
              console.error(
                'Movie Credits: Error getting credits for movieId: ' +
                  this.movieId
              );
            },
          });
      },
    });
  }

  ngOnDestroy(): void {}
}
