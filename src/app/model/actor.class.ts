import { DatePipe } from '@angular/common';
export class Actor {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Date;

  constructor(
    id: number = 0,
    firstName: string = '',
    lastName: string = '',
    gender: string = '',
    birthdate: Date = new Date()
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.birthdate = birthdate;
  }
}
