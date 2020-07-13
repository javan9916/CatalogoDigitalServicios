import {Component, Inject, OnInit} from '@angular/core';
import {InformationService} from '../../../../../services/information.service';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {getAllTags, getTagRequestsQuery, modifyServiceQuery, modifyTag} from '../../../../../querys';

@Component({
  selector: 'app-manage-tags-dialog',
  templateUrl: 'manage-tags.component.html',
  styleUrls: ['manage-tags.component.css']
})
export class ManageTagsComponent implements OnInit{
  currentService;
  serviceTags = [];
  tags = [];
  selectedTag;
  constructor(private informationService: InformationService,
              private apollo: Apollo,
              private dialogRef: MatDialogRef<ManageTagsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentService = data.service;
  }

  ngOnInit(): void {
    this.getTags();
    this.serviceTags = this.currentService.etiquetas;
    console.log(this.serviceTags);
  }

  getTags() {
    this.apollo.query({
      query: gql `${getAllTags()}`,
      variables: {Quantity: 0, Offset: 0}
    }).subscribe((result: any) => {
      result = result.data.etiquetas;
      if (result.code === 200) {
        this.tags = result.data;
      }
    });
  }

  addTag() {
    this.apollo.mutate({
      mutation: gql `${modifyTag()}`,
      variables: {Id_servicio: this.currentService.id_servicio, Etiquetas: [this.selectedTag], Add: true}
    }).subscribe((result: any) => {
      result = result.data.modificarEtiquetasServicio;
      // console.log(result);
      if (result.code === 200) {
        this.informationService.showMessage(result.message, 'success');
        console.log(result.data.etiquetas);
        this.serviceTags = result.data.etiquetas;
      }
    });
  }

  removeTag(id_etiqueta) {
    this.apollo.mutate({
      mutation: gql `${modifyTag()}`,
      variables: {Id_servicio: this.currentService.id_servicio, Etiquetas: [id_etiqueta], Add: false}
    }).subscribe((result: any) => {
      result = result.data.modificarEtiquetasServicio;
      // console.log(result);
      if (result.code === 200) {
        this.informationService.showMessage(result.message, 'success');
        console.log(result.data.etiquetas);
        this.serviceTags = result.data.etiquetas;
      }
    });
  }

}
