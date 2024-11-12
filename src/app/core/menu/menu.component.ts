import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  title: string = 'BMDB';
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem('Movie', '/movie-list', 'Movie List'),
      new MenuItem('Actor', '/actor-list', 'Actor List'),
      new MenuItem('Credit(temp)', '/credit-list', 'Credit List'),
      //   new MenuItem('Movie Credits', '', 'Movie Credits'),
      new MenuItem('Login', '/user-login', 'Login'),

      //new MenuItem('Other', '/dummy', 'Dummy Link'),
    ];
  }
}
