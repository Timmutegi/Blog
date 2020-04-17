import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private db: AngularFirestore) { }

  addArticle(title: string, content: string, path: string, path1: string, message, bio) {
    this.db.collection('articles').add({
      title, content, path, path1, message, bio
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  updateArticle(title: string, content: string, path: string, path1: string,  message: string, bio: string) {
    const ID = sessionStorage.getItem('articleID');
    console.log(ID);
    this.db.collection('articles').doc(ID).update({
      title, content, path, path1, message, bio
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  getArticles() {
    return this.db.collection('articles').get();
  }

  getArticle(doc: string) {
    return this.db.collection('articles').doc(doc).get();
  }

  deleteArticle(ID: string) {
    return this.db.collection('articles').doc(ID).delete();
  }
}
