import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$')]],
      password: ['', [Validators.required, Validators.minLength]]
    });
  }
   get f() {
    return this.loginForm.controls;
  }


  login(email: string, password: string) {
    this.submitted = true;

    if (this.loginForm.invalid) {
       return;
     }

    this.authService.signIn(email, password);
  }

}
