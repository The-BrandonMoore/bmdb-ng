import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../model/actor.class';
import { Subscription } from 'rxjs';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css',
})
export class ActorListComponent implements OnInit, OnDestroy {
  title: string = 'Actor List';
  actorList: Actor[] | undefined;
  subscription!: Subscription;

  constructor(private actorSvc: ActorService) {}

  ngOnInit(): void {
    this.subscription = this.actorSvc.list().subscribe((resp) => {
      this.actorList = resp;
    });
  }

  delete(id: number): void {
    this.subscription = this.actorSvc.delete(id).subscribe({
      next: () => {
        // redisplay the page.
        this.subscription = this.actorSvc.list().subscribe((resp) => {
          this.actorList = resp;
        });
      },
      error: (error) => {
        console.error('Error deleting actor for id:' + id);
        alert('Error Deleting Actor for ID: ' + id);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
