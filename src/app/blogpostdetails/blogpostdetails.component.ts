import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-blogpostdetails',
  templateUrl: './blogpostdetails.component.html',
  styleUrls: ['./blogpostdetails.component.scss']
})
export class BlogpostdetailsComponent implements OnInit {
  article: object[] = [];
  title: string;
  message: string;
  content: string;
  path: string;
  articleID: string;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.displayArticle();
  }

  displayArticle() {
    this.articleID = sessionStorage.getItem('articleID');
    this.db.collection('articles').doc(this.articleID).get().subscribe(
      response => {
        this.title = response.data().title;
        this.message = response.data().message;
        this.content = response.data().content;
        this.path = response.data().path;
      }
    );
  }
}
