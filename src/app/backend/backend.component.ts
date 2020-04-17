import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit {
  submitted: boolean;
  articleForm: FormGroup;
  urls: string[] = [];
  selectedPhoto: string;
  authorPhoto: string;
  message1: string;
  message2: string;
  Editor = ClassicEditor;
  editorData: string;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private crud: CrudService, private db: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getPhotos();

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      editor: ['', Validators.required],
      bio: ['', Validators.required]
    });
  }

  get f() {
    return this.articleForm.controls;
  }

  getPhotos() {
  this.db.collection('photos').get().subscribe(
    res => {
      res.forEach(doc => {
        this.storage.ref(doc.data().path)
        .getDownloadURL().subscribe(url => {
          this.urls.push(url);
        });
      });
    });
  }

  chooseArticlePhoto(url: string) {
    this.selectedPhoto = url;
  }

  chooseAuthorPhoto(url: string) {
    this.authorPhoto = url;
  }

  public onChange( { editor }: ChangeEvent ) {
        this.editorData = editor.getData();
    }

  createArticle(title: string, content: string, bio: string) {
    this.submitted = true;

    if (this.selectedPhoto == null) {
      this.message1 = 'Article Photo is not selected';
    }

    if (this.authorPhoto == null) {
      this.message2 = 'Author photo is not selected';
    }

    if (this.articleForm.invalid) {
      return;
    }
    const path = this.selectedPhoto;
    const path1 = this.authorPhoto;
    this.crud.addArticle(title, content, path, path1, this.editorData, bio);
    this.articleForm.reset();
    this.submitted = false;
  }
}
