import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Apollo} from 'apollo-angular';
import {InformationService} from '../../services/information.service';
import {Router} from '@angular/router';
import {InputUsuario} from '../../types/types';
import gql from 'graphql-tag';
import {getSignupQuery} from '../../querys';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apollo: Apollo,
    private informationService: InformationService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      id: ['', Validators.required],
      phone: [''],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  onHomeClick() {
    this.router.navigateByUrl('/main');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const inputUsuario: InputUsuario = {
        cedula: this.signupForm.get('id').value,
        contra: this.signupForm.get('password').value,
        correo: this.signupForm.get('email').value,
        nombre: this.signupForm.get('name').value,
        telefono: this.signupForm.get('phone').value,
        tipo: 0
      };
      console.log(inputUsuario);
      this.signup(inputUsuario);
    }
  }

  public signup = (inputUsuario: InputUsuario) => {
    this.apollo.mutate({
        mutation: gql `${getSignupQuery()}`,
      variables: {Input: inputUsuario}
    }).subscribe( (result: any) => {
      const response = result.data.registrarUsuario;
      if (response.code === 200) {
        this.router.navigate(['/login']);
        this.informationService.showMessage(response.message, 'success');
      } else if (response.code === 400) {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('Error message', 'error');
    });
  }

}
