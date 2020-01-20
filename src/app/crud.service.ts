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

  updateArticle(title: string, content: string, path: string, message: string) {
    const ID = sessionStorage.getItem('articleID');
    console.log(ID);
    this.db.collection('articles').doc(ID).update({
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

  deleteArticle(ID: string) {
    return this.db.collection('articles').doc(ID).delete();
  }
}
