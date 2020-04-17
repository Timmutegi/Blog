import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../crud.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  path1: string;
  bio: string;
  articleID: string;
  edit = false;
  isLoading = true;
  articlePhoto: string;
  authorPhoto: string;
  urls: string[] = [];
  updateForm: FormGroup;
  submitted: boolean;
  alert: string;
  Editor = ClassicEditor;
  public editorData: string;
  message1: string;
  message2: string;

  constructor(
    private db: AngularFirestore,
    private formBuilder: FormBuilder,
    private crud: CrudService,
    private router: Router,
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.articleID = this.activatedRoute.snapshot.params.ID;
    this.displayArticle();
    this.getPhotos();

    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      editor: ['', Validators.required],
      bio: ['', Validators.required]
    });
  }

  get f() {
    return this.updateForm.controls;
  }

  displayArticle() {
    this.db.collection('articles').doc(this.articleID).get().subscribe(
      response => {
        this.title = response.data().title;
        this.editorData = response.data().message;
        this.summary = response.data().content;
        this.path = response.data().path;
        this.path1 = response.data().path1;
        this.bio = response.data().bio;
        this.isLoading = false;
      }
    );
  }

  update() {
    this.edit = !this.edit;
    this.updateForm.patchValue({title: this.title});
    this.updateForm.patchValue({editor: this.editorData});
    this.updateForm.patchValue({summary: this.summary});
    this.updateForm.patchValue({bio: this.bio});
    this.articlePhoto = this.path;
    this.authorPhoto = this.path1;
  }

  delete() {
    this.crud.deleteArticle(this.articleID);
    this.router.navigate(['/blogposts']);
  }

  selectArticlePhoto(url: string) {
    this.articlePhoto = url;
  }

  selectAuthorPhoto(url: string) {
    this.authorPhoto = url;
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

  updateArticle(title: string, content: string, bio: string) {
    this.submitted = true;

    if (this.articlePhoto == null) {
      this.message1 = 'Article Photo is not selected';
    }

    if (this.authorPhoto == null) {
       this.message2 = 'Author Photo is not selected';
     }

    if (this.updateForm.invalid) {
      return;
    }

    const path = this.articlePhoto;
    const path1 = this.authorPhoto;
    this.crud.updateArticle(title, content, path, path1, this.editorData, bio);
    this.updateForm.reset();
    this.submitted = false;
  }
}
