import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles: object[] = [];

  constructor(private crud: CrudService) { }

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

}
