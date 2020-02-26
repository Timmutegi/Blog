import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: object[] = [];

  constructor(private crud: CrudService, private router: Router) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.crud.getArticles().subscribe(
      res => {
        for (let i = 0; i <= 4; i++) {
          res.forEach(doc => {
            this.articles.push({
              title: doc.data().title,
              content: doc.data().content,
              path: doc.data().path,
              ID: doc.id
            });
          });
        }
      }
    );
  }

  readMore(ID: string) {
    this.crud.getArticles().subscribe(
      res => {
        res.forEach(doc => {
          if (ID === doc.id) {
            sessionStorage.setItem('articleID', doc.id);
            this.router.navigate(['articles/article']);
          }
        });
      }
    );
  }
}
