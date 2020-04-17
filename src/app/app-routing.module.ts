import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackendComponent } from './backend/backend.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { AuthGuard } from './auth/auth.guard';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { HomeComponent } from './home/home.component';
import { BlogpostsComponent } from './blogposts/blogposts.component';
import { BlogpostdetailsComponent } from './blogpostdetails/blogpostdetails.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'backend', component: BackendComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: FileUploadComponent, canActivate: [AuthGuard] },
  { path: 'blogposts', component: ArticlesListComponent, canActivate: [AuthGuard] },
  { path: 'blogposts/blogpost', component: ArticleDetailsComponent, canActivate: [AuthGuard] },
  { path: 'blogposts/:ID', component: ArticleDetailsComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent},
  { path: 'articles', component: BlogpostsComponent },
  { path: 'articles/article', component: BlogpostdetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
