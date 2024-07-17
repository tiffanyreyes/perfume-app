import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  // @ViewChild('sidenav') sidenav!: MatSidenav;

  // isLoggedIn$ = this.isLoggedIn$;
  // currentUser$ = this.currentUser$;

  constructor(
    private router: Router
  ) {}

  // openSidenav() {
  //   this.sidenav.open();
  // }

  signOut() {
    this.signOut();
  }
}
