import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie.class';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css',
})
export class MovieEditComponent implements OnInit, OnDestroy {
  title: string = 'Edit Movie';
  movieId!: number;
  movie!: Movie;
  subscription!: Subscription;
  ratings: string[] = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

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

    // get the movie for the id
    this.subscription = this.movieSvc.getById(this.movieId).subscribe({
      next: (resp) => {
        this.movie = resp;
      },
      error: (err) => {
        console.log('Error retrieving movie: ', err);
      },
    });
  }
  editMovie(id: number): void {
    this.subscription = this.movieSvc.editMovie(id, this.movie).subscribe({
      next: () => {
        this.router.navigateByUrl('movie-list');
      },
      error: (err) => {
        console.error('Error updating movie:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }
}
