import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getLocationQuery } from '../../../querys';

import { InputLocalizacion } from '../../../types/types'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InformationService } from '../../../services/information.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {
  locationForm: FormGroup

  onChosen = false;
  maplat = 9.937236533452204;
  maplng = -84.09428348902404;
  markerlat = 0;
  markerlng = 0;
  circle: number = 0;
  radius: number;
  
  constructor(private formBuilder: FormBuilder, private apollo: Apollo,
    private informationService: InformationService) { }

  ngOnInit(): void { 
    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
      visible: ['', Validators.required],
    });
  }

  onMapClicked(event) {
    console.log(event);
    this.markerlat = event.coords.lat;
    this.markerlng = event.coords.lng;
    this.onChosen = true;
  }

  onSubmit() { 
    if (this.locationForm.valid) {
      const inputLocalizacion: InputLocalizacion = {
        nombre: this.locationForm.get('name').value,
        x: this.markerlat,
        y: this.markerlng,
        radio: (this.circle / 111000),
        visible: this.locationForm.get('visible').value,
      };
      console.log(inputLocalizacion);
      this.create(inputLocalizacion);
    }
  }

  public create = (inputLocalizacion: InputLocalizacion) => {
    this.apollo.mutate({
        mutation: gql `${getLocationQuery()}`,
      variables: {Input: inputLocalizacion}
    }).subscribe( (result: any) => {
      const response = result.data.agregarLocalizacion;
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
      } else if (response.code === 400) {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('Error message', 'error');
    });
  }

  onKeyup() {
    if (this.onChosen) {
      this.circle = this.radius; 
    }
  }

}
