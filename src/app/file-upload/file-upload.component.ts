import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  urls: object[] = [];
  photos: any;
  displayGallery = false;
  photo: string;
  doc: string;
  message: string;
  toggle = false;
  progress: string;
  state: boolean;

  // Main Task
  task: AngularFireUploadTask;

  // Progress Monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  downloadURL: Observable<string>;

  isHovering: boolean;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {
    this.getPhotos();
  }

  toggleHover(event: boolean) {
    console.log(event);
    this.isHovering = event;
  }

  gallery() {
     this.displayGallery = !this.displayGallery;
  }

  getPhotos() {
  this.db.collection('photos').get().subscribe(
    res => {
      res.forEach(doc => {
        this.storage.ref(doc.data().path)
        .getDownloadURL().subscribe(url => {
          this.urls.push({url, id: doc.id});
        });
      });
      this.photos = this.urls;
    });
  }

  deletePhoto() {
    this.db.collection('photos').doc(this.doc).delete().then(
      res => {
        this.photo = null;
        this.message = 'Photo has successfully been deleted';
        this.urls = [];
        this.getPhotos();
        this.toggle = true;
      }
    ).catch(
      err => {
        this.message = `Error deleting photo ${err}`;
      }
    );
  }

  close() {
    this.message = null;
    this.toggle = false;
  }

  displayPhoto(url: string, id: string) {
    console.log(url, id);
    this.photo = url;
    this.doc = id;
  }

  startUpload(event: FileList) {
    // The File object
    this.state = true;
    this.progress = null;
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.db.collection('photos').add({path, size: snap.totalBytes});
          this.state = false;
          this.urls = [];
          this.getPhotos();
          this.progress = 'Upload Successful';
        }
      })
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
