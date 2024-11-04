import { Component, OnInit } from '@angular/core';
import { Credit } from '../../../model/credit.class';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrl: './credit-create.component.css',
})
export class CreditCreateComponent {
  title: string = 'Credit Create';
}
