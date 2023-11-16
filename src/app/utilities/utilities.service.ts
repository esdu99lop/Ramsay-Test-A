import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'ok') {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom'
    });
  }
}