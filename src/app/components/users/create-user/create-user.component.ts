import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  durationInSeconds = 3; // tempo de duração do snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //posição horizontal
  verticalPosition: MatSnackBarVerticalPosition = 'top'; // posição vertical


  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(displayMessage: string, buttonText: string, type: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data:{
        message: displayMessage,
        buttonText: buttonText,
        type: type,
      },
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'error-snackbar',
    });
    
  }
}
