import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  myForm: FormGroup;
  submitted = false;
  message = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  get f() {
    return this.myForm.controls;
  }

  submit() {
    this.submitted = true;

    if (this.myForm.invalid) {
       return;
     }
    this.http.post('https://formspree.io/xzbeogkk', this.myForm.value).subscribe(
      res => {
        if (res.hasOwnProperty('next') === true) {
          this.message = true;
        }
      }
    );
  }
}
