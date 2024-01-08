import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from './components/shared/dialog-form-details/dialog-form-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lanchonete';

  get login(): string {
    return localStorage.getItem('login') || ''; // Obter o nome do usuário do localStorage
  }

  get id_user(): string {
    return localStorage.getItem('id_user') || ''; // Obter o nome do usuário do localStorage
  }

  constructor(public dialog: MatDialog){}

  
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
