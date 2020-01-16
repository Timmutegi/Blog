import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  clickMenu() {
    const navs = document.querySelectorAll('.Navbar-Items');

    navs.forEach(nav => nav.classList.toggle('Navbar-ToggleShow'));
  }

  logout() {
    this.authService.logout();
  }


}
