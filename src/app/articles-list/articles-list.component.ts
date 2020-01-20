import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles: object[] = [];

  constructor(private crud: CrudService, private router: Router) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.crud.getArticles().subscribe(
      res => {
        res.forEach(doc => {
          this.articles.push({title: doc.data().title, content: doc.data().content, path: doc.data().path, id: doc.id});
        });
        console.log(this.articles);
      }
    );
  }

  readMore(path) {
    this.crud.getArticles().subscribe(
      res => {
        res.forEach(doc => {
          if (path === doc.data().path) {
            sessionStorage.setItem('articleID', doc.id);
            this.router.navigate(['blogposts/blogpost']);
          }
        });
      }
    );
  }
}
