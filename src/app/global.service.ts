import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from './components/shared/dialog-form-details/dialog-form-details.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public dialog: MatDialog) { }

  olamundo(){
    alert('olá');
  }

    // função que chama o dialog
    openDialog(titulo: string): void {
      const dialogRef = this.dialog.open(DialogFormDetailsComponent, {
        data: {titulo: titulo},
        // width:'50%'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
}
