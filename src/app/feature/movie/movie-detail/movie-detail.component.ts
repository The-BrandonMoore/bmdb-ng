import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie.class';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  title: string = 'Movie Details';
  movieId!: number;
  movie!: Movie;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private movieSvc: MovieService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get id from the url
    this.actRoute.params.subscribe((parms) => {
      this.movieId = parms['id'];
    });
    this.subscription = this.movieSvc.getById(this.movieId).subscribe({
      next: (resp) => {
        this.movie = resp;
      },
      error: (err) => {
        console.log('Error retrieving movie: ', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }
}
