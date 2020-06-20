import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseUsuario } from '../../types/types';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { getLoginQuery } from '../../querys';
import {InformationService} from '../../services/information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private apollo: Apollo,
              private informationService: InformationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.login(email, password);
    }
  }

  public login = (correo: string, password: string) => {
    this.apollo.query({
      query: gql `${getLoginQuery(correo, password)}`,
    }).subscribe( (result: any) => {
      const response: ResponseUsuario = result.data.login;
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
        this.router.navigate(['/main']);
        sessionStorage.setItem('loggedIn', 'true');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('No se ha encontrado el usuario', 'warn');
    });
  }
}
