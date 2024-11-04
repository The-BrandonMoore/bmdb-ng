import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie.class';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit, OnDestroy {
  title: string = 'Movie List';
  movieList: Movie[] | undefined;
  subscription!: Subscription;

  constructor(private movieSvc: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieSvc.list().subscribe((resp) => {
      this.movieList = resp;
    });
  }

  delete(id: number): void {
    this.subscription = this.movieSvc.delete(id).subscribe({
      next: () => {
        // redisplay the page.
        this.subscription = this.movieSvc.list().subscribe((resp) => {
          this.movieList = resp;
        });
      },
      error: (error) => {
        console.error('Error deleting movie for id:' + id);
        alert('Error Deleting Movie for ID: ' + id);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
