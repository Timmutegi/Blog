import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackendComponent } from './backend/backend.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [
  { path: 'backend', component: BackendComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: FileUploadComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticlesListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
