import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../model/actor.class';

const URL = 'http://localhost:5284/api/Actors';
@Injectable({
  providedIn: 'root',
})
export class ActorService {
  constructor(private http: HttpClient) {}

  //this is the GetAll
  list(): Observable<Actor[]> {
    return this.http.get(URL) as Observable<Actor[]>; //this is the C# version
    //for Java: return this.http.get(URL + '/') as Observable<Actor[]>;
  }

  //addActor(actor: Actor) method POST mapping
  add(actor: Actor): Observable<Actor> {
    return this.http.post(URL, actor) as Observable<Actor>;
  }

  //delete(id: number)
  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id);
  }

  //getById -- this is viewing a single instance of a Actor
  getById(id: number): Observable<Actor> {
    return this.http.get(URL + '/' + id) as Observable<Actor>;
  }

  //put edit() -- this is called with the submit/save changes button.
  editActor(id: number, actor: Actor): Observable<Actor> {
    return this.http.put(URL + '/' + id, actor) as Observable<Actor>;
  }
}
