import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private db: AngularFirestore) { }

  addArticle(title: string, content: string, path: string, message) {
    this.db.collection('articles').add({
      title, content, path, message
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  getArticles() {
    return this.db.collection('articles').get();
  }
}
