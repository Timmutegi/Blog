import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontend-navbar',
  templateUrl: './frontend-navbar.component.html',
  styleUrls: ['./frontend-navbar.component.scss']
})
export class FrontendNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clickMenu() {
    const navs = document.querySelectorAll('.Navbar-Items');

    navs.forEach(nav => nav.classList.toggle('Navbar-ToggleShow'));
  }

}
