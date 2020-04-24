import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {}

  signIn(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(
          res => {
            resolve(res);
            console.log(res);
            sessionStorage.setItem('user', 'ok');
            this.router.navigate(['/backend']);
          },
          err => {
            reject(err);
            alert(err);
          }
        );
    });
  }

  async logout() {
    await this.angularFireAuth.auth.signOut();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('articleID');
    this.router.navigate(['/']);
  }
}
