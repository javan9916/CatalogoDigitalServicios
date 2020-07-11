import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component'
import { InputTag } from '../../types/types'

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { InformationService } from '../../services/information.service';
import { getTagQuery } from '../../querys';

@Component({
  selector: 'app-crud-tag',
  templateUrl: './crud-tag.component.html',
  styleUrls: ['./crud-tag.component.css']
})
export class CrudTagComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private apollo: Apollo,
    private informationService: InformationService) { }

  ngOnInit(): void {
  }

  openDialog(action) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '80%';
    dialogConfig.maxHeight = '80%';

    if (action == 'Nueva Etiqueta') {
      dialogConfig.data = {
        action: action
      }
    }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        if (data.action == 'Nueva Etiqueta') {
          const inputTag: InputTag = {
            nombre: data.name
          };
          this.createTag(inputTag);
        } 
      }
    })
  }

  public createTag = (inputTag: InputTag) => {
    this.apollo.mutate({
        mutation: gql `${getTagQuery()}`,
        variables: {Input: inputTag}
    }).subscribe( (result: any) => {
      const response = result.data.agregarEtiqueta;
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
      } else if (response.code === 400) {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('Error message', 'error');
    });
  }

}
