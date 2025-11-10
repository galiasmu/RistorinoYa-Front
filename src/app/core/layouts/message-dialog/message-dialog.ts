import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import type {Imessage} from '../../models/Imessage';

@Component({
  selector: 'app-message-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './message-dialog.html',
  styleUrl: './message-dialog.css',
})
export class MessageDialog implements OnInit{

  title!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public message: Imessage, public ref: MatDialogRef<MessageDialog>) {}

  ngOnInit(): void {
    this.title = this.message.title || $localize`Mensaje de error`;
  }

}
