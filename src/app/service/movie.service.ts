import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../model/movie.class';
import { Observable } from 'rxjs';

const URL = 'http://localhost:5284/api/Movies';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  //this is the GetAll
  list(): Observable<Movie[]> {
    return this.http.get(URL) as Observable<Movie[]>; //this is the C# version
    //for Java: return this.http.get(URL + '/') as Observable<Movie[]>;
  }

  //addMovie(movie: movie) method POST mapping
  add(movie: Movie): Observable<Movie> {
    return this.http.post(URL, movie) as Observable<Movie>;
  }

  //delete(id: number)
  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id);
  }

  //getById -- this is viewing a single instance of a Movie
  getById(id: number): Observable<Movie> {
    return this.http.get(URL + '/' + id) as Observable<Movie>;
  }

  //put edit() -- this is called with the submit/save changes button.
  editMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put(URL + '/' + id, movie) as Observable<Movie>;
  }
}
