import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  article: object[] = [];
  title: string;
  message: string;
  summary: string;
  path: string;
  articleID: string;
  edit = false;
  displayGallery = false;
  selectedPhoto: string;
  urls: string[] = [];
  updateForm: FormGroup;
  submitted: boolean;
  alert: string;
  Editor = ClassicEditor;
  public editorData: string;

  // tslint:disable-next-line:max-line-length
  constructor(private db: AngularFirestore, private formBuilder: FormBuilder, private crud: CrudService, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.displayArticle();
    this.getPhotos();

    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      editor: ['', Validators.required]

    });
  }

  get f() {
    return this.updateForm.controls;
  }

  displayArticle() {
    this.articleID = sessionStorage.getItem('articleID');
    this.db.collection('articles').doc(this.articleID).get().subscribe(
      response => {
        this.title = response.data().title;
        this.editorData = response.data().message;
        this.summary = response.data().content;
        this.path = response.data().path;
        console.log(this.editorData);
      }
    );
  }

  update() {
    this.edit = !this.edit;
    this.updateForm.patchValue({title: this.title});
    this.updateForm.patchValue({editor: this.editorData});
    this.updateForm.patchValue({summary: this.summary});
    this.selectedPhoto = this.path;
  }

  delete() {
    this.crud.deleteArticle(this.articleID);
    this.router.navigate(['/blogposts']);
  }

  gallery() {
    this.displayGallery = !this.displayGallery;
  }

  choosePhoto(url: string) {
    this.selectedPhoto = url;
  }

  getPhotos() {
  this.db.collection('photos').get().subscribe(
    res => {
      // console.log(res);
      res.forEach(doc => {
        this.storage.ref(doc.data().path)
        .getDownloadURL().subscribe(url => {
          this.urls.push(url);
        });
      });
      // console.log(this.urls);
    });
  }

  public onChange( { editor }: ChangeEvent ) {
      this.editorData = editor.getData();
      // console.log(this.editorData );
  }

  updateArticle(title: string, content: string) {
    this.submitted = true;

    if (this.selectedPhoto == null) {
      this.alert = 'Photo is not selected';
      console.log(this.alert);
    }

    if (this.updateForm.invalid) {
      return;
    }

    const path = this.selectedPhoto;
    this.crud.updateArticle(title, content, path, this.editorData);
    this.updateForm.reset();
    this.submitted = false;
  }
}
