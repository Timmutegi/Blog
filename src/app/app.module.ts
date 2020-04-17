import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { BackendComponent } from './backend/backend.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DropzoneDirective } from './dropzone.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FilesizePipe } from './filesize.pipe';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { HomeComponent } from './home/home.component';
import { BlogpostsComponent } from './blogposts/blogposts.component';
import { BlogpostdetailsComponent } from './blogpostdetails/blogpostdetails.component';
import { FrontendNavbarComponent } from './frontend-navbar/frontend-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BackendFooterComponent } from './backend-footer/backend-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BackendComponent,
    NavbarComponent,
    DropzoneDirective,
    FileUploadComponent,
    FilesizePipe,
    ArticlesListComponent,
    ArticleDetailsComponent,
    HomeComponent,
    BlogpostsComponent,
    BlogpostdetailsComponent,
    FrontendNavbarComponent,
    FooterComponent,
    HeroSectionComponent,
    BackendFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
