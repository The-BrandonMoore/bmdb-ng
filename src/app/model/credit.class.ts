export class Credit {
  id: number;
  movieId: number;
  actorId: number;
  role: string;

  constructor(
    id: number = 0,
    movieId: number = 0,
    actorId: number = 0,
    role: string = ''
  ) {
    this.id = id;
    this.movieId = movieId;
    this.actorId = actorId;
    this.role = role;
  }
}
