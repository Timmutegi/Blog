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
  blogposts: any;
  isLoading = true;

  constructor(private crud: CrudService, private router: Router) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.crud.getArticles().subscribe(
      res => {
        res.forEach(doc => {
          this.articles.push({title: doc.data().title, content: doc.data().content, path: doc.data().path, id: doc.id});
          this.isLoading = false;
        });
        this.blogposts = this.articles;
      }
    );
  }

  readArticle(ID: string) {
    this.router.navigate([`blogposts/${ID}`]);
  }

}
