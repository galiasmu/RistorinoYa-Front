import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Imessage } from '../models/Imessage';

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  private readonly _snackBar = inject(MatSnackBar);

  showMessage(message: Imessage): void {
    const text = message.num !== undefined
      ? `[${message.num}] ${message.text}`
      : message.text;

    this._snackBar.open(text, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
