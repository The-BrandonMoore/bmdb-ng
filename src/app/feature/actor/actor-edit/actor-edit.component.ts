import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from '../../../service/actor.service';
import { Actor } from '../../../model/actor.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrl: './actor-edit.component.css',
})
export class ActorEditComponent implements OnInit, OnDestroy {
  title: string = 'Edit Actor';
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

    // get the actor for the id
    this.subscription = this.actorSvc.getById(this.actorId).subscribe({
      next: (resp) => {
        this.actor = resp;
      },
      error: (err) => {
        console.log('Error retrieving Actor: ', err);
      },
    });
  }

  editActor(id: number): void {
    this.subscription = this.actorSvc.editActor(id, this.actor).subscribe({
      next: () => {
        this.router.navigateByUrl('actor-list');
      },
      error: (err) => {
        console.error('Error updating actor:', err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }
}
