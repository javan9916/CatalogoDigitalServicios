import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  locationForm: FormGroup;
  
  locationId: number;
  locationName: string;
  locationVisible: boolean;
  locationLat: number;
  locationLng: number;
  locationMarkerLat: number;
  locationMarkerLng: number;
  locationRadius: number;
  locationCircle: number;
  
  action: string;
  index: number;

  constructor( private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) { 

      this.action = data.action;

      if (this.action == 'Eliminar') {
        this.locationId = data.id;
        this.locationName = data.name;
        this.index = data.index;
      } else if (data.action == 'Editar') {
        this.locationId = data.id;
        this.locationName = data.name;
        this.locationVisible = data.visible;
        this.locationLat = data.lat;
        this.locationLng = data.lng;
        this.locationMarkerLat = data.lat;
        this.locationMarkerLng = data.lng;
        this.locationRadius = Math.round(data.radius*111000);
        this.locationCircle = this.locationRadius;
        this.index = data.index;
      }
    }

  ngOnInit(): void {
    if (this.action == 'Eliminar') {
      this.locationForm = this.formBuilder.group({
        id: [this.locationId],
        name: [this.locationName],
        action: [this.action]
      });
    } else if (this.action == 'Editar') {
      this.locationForm = this.formBuilder.group({
        id: [this.locationId],
        name: [this.locationName],
        visible: [this.locationVisible],
        lat: [this.locationMarkerLat],
        lng: [this.locationMarkerLng],
        radius: [this.locationCircle],
        action: [this.action],
      })
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
    this.dialogRef.close(this.locationForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
