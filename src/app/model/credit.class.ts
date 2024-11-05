import { Actor } from './actor.class';
import { Movie } from './movie.class';

export class Credit {
  id: number;
  movieId: number;
  actorId: number;
  actor: Actor;
  movie: Movie;
  role: string;

  constructor(
    id: number = 0,
    movieId: number = 0,
    actorId: number = 0,
    movie: Movie = new Movie(),
    actor: Actor = new Actor(),
    role: string = ''
  ) {
    this.id = id;
    this.movieId = movieId;
    this.actorId = actorId;
    this.actor = actor;
    this.movie = movie;
    this.role = role;
  }
}
