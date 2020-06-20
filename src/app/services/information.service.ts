import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class InformationService {

  constructor(public snackBar: MatSnackBar) {
  }

  public showMessage(message: string, style: string) {
    this.snackBar.open(message, '', { duration: 3000, horizontalPosition: 'right', panelClass: style});
  }
}
