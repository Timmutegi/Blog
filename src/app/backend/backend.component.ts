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
  displayGallery = false;
  alert: string;
  Editor = ClassicEditor;
  editorData: string;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private crud: CrudService, private db: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getPhotos();

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      editor: ['', Validators.required]
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

  gallery() {
    this.displayGallery = !this.displayGallery;
  }

  choosePhoto(url: string) {
    this.selectedPhoto = url;
  }

  public onChange( { editor }: ChangeEvent ) {
        this.editorData = editor.getData();
        // console.log(this.editorData );
    }

  createArticle(title: string, content: string) {
    console.log(1);
    this.submitted = true;

    if (this.selectedPhoto == null) {
      this.alert = 'Photo is not selected';
      console.log(this.alert);
    }

    if (this.articleForm.invalid) {
      return;
    }
    const path = this.selectedPhoto;
    this.crud.addArticle(title, content, path, this.editorData);
    this.articleForm.reset();
    this.submitted = false;
  }
}
