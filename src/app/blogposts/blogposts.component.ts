import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.scss']
})
export class BlogpostsComponent implements OnInit {
  articles: object[] = [];

  constructor(private router: Router, private crud: CrudService ) { }

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
            sessionStorage.setItem('articleID', doc.id);
            this.router.navigate(['articles/article']);
          }
        });
      }
    );
  }

}
