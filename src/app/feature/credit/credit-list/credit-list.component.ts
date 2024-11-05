import { Component, OnInit } from '@angular/core';
import { Credit } from '../../../model/credit.class';
import { Subscription } from 'rxjs';
import { CreditService } from '../../../service/credit.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.css',
})
export class CreditListComponent implements OnInit {
  title: string = 'Credit List';
  creditList: Credit[] | undefined;
  subscription!: Subscription;

  constructor(private creditSvc: CreditService) {}

  ngOnInit(): void {
    this.subscription = this.creditSvc.list().subscribe((resp) => {
      this.creditList = resp;
    });
  }

  delete(id: number): void {
    this.subscription = this.creditSvc.delete(id).subscribe({
      next: () => {
        // redisplay the page.
        this.subscription = this.creditSvc.list().subscribe((resp) => {
          this.creditList = resp;
          // add code to loop through the credits and populate the movie and actor for each.
        });
      },
      error: (error) => {
        console.error('Error deleting credit for id:' + id);
        alert('Error Deleting Credit for ID: ' + id);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
