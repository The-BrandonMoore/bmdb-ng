import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../model/actor.class';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrl: './actor-detail.component.css',
})
export class ActorDetailComponent implements OnInit, OnDestroy {
  title: string = 'Actor Details';
  actorId!: number;
  actor!: Actor;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private actorSvc: ActorService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((parms) => {
      this.actorId = parms['id'];
    });
    this.subscription = this.actorSvc.getById(this.actorId).subscribe({
      next: (resp) => {
        this.actor = resp;
      },
      error: (err) => {
        console.log('Error retrieving actor: ', err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }
}
