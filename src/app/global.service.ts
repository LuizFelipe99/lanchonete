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
    openDialog(titulo: string, component: string, identifier: string, largura: string): void {
      const identity = identifier;
      const dialogRef = this.dialog.open(DialogFormDetailsComponent, {
        data: {titulo: titulo, component: component, identifier: identifier},
        width: largura
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
      
      // setando o identificador na localstorage para consultas em outros componentes
      localStorage.setItem('identifier', identity); // Salvar o nome do usuário no localStorage
    }
}
