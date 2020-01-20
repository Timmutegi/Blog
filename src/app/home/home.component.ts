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
        res.forEach(doc => {
          this.articles.push({title: doc.data().title, content: doc.data().content, path: doc.data().path});
        });
        // console.log(this.articles);
      }
    );
  }

  readMore(path) {
    this.crud.getArticles().subscribe(
      res => {
        res.forEach(doc => {
          if (path === doc.data().path) {
            localStorage.setItem('articleID', doc.id);
            console.log(localStorage.getItem('articleID'));
            this.router.navigate(['articles/article']);
          }
        });
      }
    );
  }
}
