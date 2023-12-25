import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-form-details',
  templateUrl: './dialog-form-details.component.html',
  styleUrls: ['./dialog-form-details.component.scss']
})
export class DialogFormDetailsComponent {

  constructor( public dialogRef: MatDialogRef<DialogFormDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,){}


  cancel(): void {
    this.dialogRef.close();
  }
}
