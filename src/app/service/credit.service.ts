import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../model/movie.class';
import { Observable } from 'rxjs';
import { Credit } from '../model/credit.class';

const URL = 'http://localhost:5284/api/Credits';
@Injectable({
  providedIn: 'root',
})
export class CreditService {
  constructor(private http: HttpClient) {}

  //this is the GetAll
  list(): Observable<Credit[]> {
    return this.http.get(URL) as Observable<Credit[]>; //this is the C# version
    //for Java: return this.http.get(URL + '/') as Observable<Movie[]>;
  }

  //addMovie(movie: movie) method POST mapping
  add(credit: Credit): Observable<Credit> {
    return this.http.post(URL, credit) as Observable<Credit>;
  }

  //delete(id: number)
  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id);
  }

  //getById -- this is viewing a single instance of a Movie
  getById(id: number): Observable<Credit> {
    return this.http.get(URL + '/' + id) as Observable<Credit>;
  }

  //put edit() -- this is called with the submit/save changes button.
  editCredit(credit: Credit): Observable<Credit> {
    return this.http.put(URL + '/' + credit.id, credit) as Observable<Credit>;
  }

  getByMovieId(movieId: number): Observable<Credit[]> {
    return this.http.get(URL + '/movie/' + movieId) as Observable<Credit[]>;
  }
}
