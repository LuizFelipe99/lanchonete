import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogFormDetailsComponent } from './components/shared/dialog-form-details/dialog-form-details.component';
import { SnackbarComponent } from './components/shared/alert/snackbar.component';
import { Router } from '@angular/router';
import { ErrorService } from './services/auth/error.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public router: Router,
    private errorService: ErrorService
    // private dialogRef: MatDialogRef<DialogFormDetailsComponent>

  ) { }

  // função que chama o dialog
  openDialog(titulo: string, component: string, identifier: string, largura: string): void {
    const identity = identifier;
    const dialogRef = this.dialog.open(DialogFormDetailsComponent, {
      data: { titulo: titulo, component: component, identifier: identifier },
      width: largura
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    // setando o identificador na localstorage para consultas em outros componentes
    localStorage.setItem('identifier', identity); // Salvar o nome do usuário no localStorage
  }

  // função que chama o modal de sucesso / erro
  durationInSeconds = 3; // tempo de duração do snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //posição horizontal
  verticalPosition: MatSnackBarVerticalPosition = 'top'; // posição vertical

  openSnackBar(displayMessage: string, buttonText: string, type: string, style: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: type,
      },
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: style,
    });

  }

  //funcao que verifica token que vem da api
  veryTokenExpired(data: any) {
    if (data.token_expired) {
      this.openSnackBar('Login expirado', 'Ok', 'Erro!', 'error-snackbar');
      localStorage.clear(); // limpa toda localStorage
      this.router.navigate(['/login']); // Redirecionar para a página inicial (login) 
      this.dialog.closeAll();
    }
  }

  //funcao de verificar se o usuário é administrador
isAdmin = false;

veriryGroupUser(): boolean {
  const usergroup = localStorage.getItem('usergroup') || '';
  console.log('usergroup lido do localStorage:', usergroup);

  if (usergroup === '1') {
    this.isAdmin = true;
    return true;
  } else {
    return false;
  }
}


}
