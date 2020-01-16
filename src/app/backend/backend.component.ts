import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

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

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private crud: CrudService, private db: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getPhotos();

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  get f() {
    return this.articleForm.controls;
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

  gallery() {
    this.displayGallery = !this.displayGallery;
  }

  choosePhoto(url: string) {
    this.selectedPhoto = url;
  }

  createArticle(title: string, content: string, message: string) {
    this.submitted = true;

    if (this.selectedPhoto == null) {
      this.alert = 'Photo is not selected';
      console.log(this.alert);
    }

    if (this.articleForm.invalid) {
      return;
    }
    const path = this.selectedPhoto;
    this.crud.addArticle(title, content, path, message);
    this.articleForm.reset();
    this.submitted = false;

  }

}
