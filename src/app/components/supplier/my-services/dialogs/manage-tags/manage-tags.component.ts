import {Component, Inject, OnInit} from '@angular/core';
import {InformationService} from '../../../../../services/information.service';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {getTagRequestsQuery, modifyServiceQuery} from '../../../../../querys';

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
    console.log(this.currentService);
    console.log(this.serviceTags);
    console.log(this.currentService.id_servicio);
  }

  getTags() {
    this.apollo.query({
      query: gql `${getTagRequestsQuery(0, 0, 'A')}`
    }).subscribe((result: any) => {
      result = result.data.solicitudesEtiqueta;
      if (result.code === 200) {
        this.tags = result.data;
      }
      console.log(result);
    });
  }

}
