import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      id: ['', Validators.required],
      phone: [''],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['',Validators.required]
    })
  }

  onSubmit() { }

}
