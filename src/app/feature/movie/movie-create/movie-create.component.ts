import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie.class';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../service/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrl: './movie-create.component.css',
})
export class MovieCreateComponent implements OnInit, OnDestroy {
  title: string = 'Movie Create';
  newMovie: Movie = new Movie();
  subscription!: Subscription;
  ratings: string[] = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

  constructor(private movieSvc: MovieService, private router: Router) {}

  ngOnInit(): void {}

  addMovie(): void {
    //call movieSvc.add method
    this.subscription = this.movieSvc.add(this.newMovie).subscribe((resp) => {
      //route/redirect to movie-list component
      this.router.navigateByUrl('/movie-list');
    });
    //forward to movie-list
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }
}
