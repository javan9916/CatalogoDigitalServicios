import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  dialogForm: FormGroup;

  locationId: number;
  locationName: string;
  locationVisible: boolean;
  locationLat: number;
  locationLng: number;
  locationMarkerLat: number;
  locationMarkerLng: number;
  locationRadius: number;
  locationCircle: number;
  marker: any;

  tagName: string;
  tagId: number;

  action: string;
  localAction: string;
  index: number;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) {

    this.action = data.action;

    if (this.action == 'Eliminar') {
      this.locationId = data.id;
      this.locationName = data.name;
      this.index = data.index;
      this.localAction = 'Eliminar'
    } else if (this.action == 'Editar') {
      this.locationId = data.id;
      this.locationName = data.name;
      this.locationVisible = data.visible;
      console.log(this.locationVisible);
      this.locationLat = data.lat;
      this.locationLng = data.lng;
      this.locationMarkerLat = data.lat;
      this.locationMarkerLng = data.lng;
      this.locationRadius = Math.round(data.radius * 111000);
      this.locationCircle = this.locationRadius;
      this.index = data.index;
    } else if (this.action == 'Editar Etiqueta') {
      this.localAction = 'Etiqueta';
      this.tagId = data.id;
      this.tagName = data.tag;
      this.index = data.index;
    } else if (this.action == 'Eliminar Etiqueta') {
      this.localAction = 'Etiqueta';
      this.tagId = data.id;
      this.tagName = data.tag;
      this.index = data.index;
    } else if (this.action == 'Nueva Etiqueta') {
      this.localAction = 'NEtiqueta';
    }
  }

  ngOnInit(): void {
    if (this.action == 'Eliminar') {
      this.dialogForm = this.formBuilder.group({
        id: [this.locationId],
        name: [this.locationName],
        action: [this.action]
      });
    } else if (this.action == 'Editar') {
      this.dialogForm = this.formBuilder.group({
        id: [this.locationId],
        name: [this.locationName],
        visible: [this.locationVisible],
        lat: [this.locationLat],
        lng: [this.locationLng],
        radius: [this.locationCircle],
        marker: [this.marker],
        action: [this.action],
      });
    } else if (this.localAction == 'NEtiqueta') {
      this.dialogForm = this.formBuilder.group({
        name: [, Validators.required],
        action: [this.action],
      });
    } else if (this.localAction == 'Etiqueta') {
      this.dialogForm = this.formBuilder.group({
        id: [this.tagId],
        name: [this.tagName],
        action: [this.action],
      });
    }
  }

  onMapClicked(event) {
    console.log(event);
    this.locationMarkerLat = event.coords.lat;
    this.locationMarkerLng = event.coords.lng;
  }

  onKeyup() {
    this.locationCircle = this.locationRadius;
  }

  save() {
    if (this.localAction == 'Etiqueta' || this.localAction == 'NEtiqueta' || this.localAction == 'Eliminar') {
      this.dialogRef.close(this.dialogForm.value);
    } else {
      this.dialogForm.controls['lat'].setValue(this.locationMarkerLat);
      this.dialogForm.controls['lng'].setValue(this.locationMarkerLng);
      this.dialogRef.close(this.dialogForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
