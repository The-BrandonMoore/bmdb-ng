import { Component, OnInit } from '@angular/core';
import { Credit } from '../../../model/credit.class';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.css',
})
export class CreditListComponent implements OnInit {
  title: string = 'Credit List';
  creditList: Credit[] = [];

  ngOnInit(): void {
    this.creditList = [
      new Credit(1, 1, 1, 'Andy Dufresne'), // Tim Robbins in The Shawshank Redemption
      new Credit(2, 1, 2, "Ellis 'Red' Redding"), // Morgan Freeman in The Shawshank Redemption
      new Credit(3, 2, 3, 'Vincent Vega'), // John Travolta in Pulp Fiction
      new Credit(4, 2, 4, 'Mia Wallace'), // Uma Thurman in Pulp Fiction
      new Credit(5, 3, 5, 'Bruce Wayne / Batman'), // Christian Bale in The Dark Knight
      new Credit(6, 4, 6, 'Forrest Gump'), // Tom Hanks in Forrest Gump
      new Credit(7, 5, 7, 'Neo'), // Keanu Reeves in The Matrix
      new Credit(8, 6, 8, 'Tyler Durden'), // Brad Pitt in Fight Club
      new Credit(9, 7, 9, 'Frodo Baggins'), // Elijah Wood in The Lord of the Rings
      new Credit(10, 8, 10, 'Maximus Decimus Meridius'), // Russell Crowe in Gladiator
    ];
  }

  delete(i: number) {
    this.creditList.splice(i, 1);
  }
}
