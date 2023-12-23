import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
// pegando o login na localstorage
get login(): string {
  return localStorage.getItem('login') || ''; // Obter o nome do usuário do localStorage
}

  durationInSeconds = 3; // tempo de duração do snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //posição horizontal
  verticalPosition: MatSnackBarVerticalPosition = 'top'; // posição vertical

    // Objeto para o formulário de filtro
    formData: {
      name: string;
      login: string;
      password: string;
      active: number;
      contact: string;
      usergroup: number;
    } = {
      name: '', 
      login: '',
      password: '',
      active: 1,
      contact: '',
      usergroup: 1,
    };
  
    users: any[] = [];
    totalUsers: number = 0;
    totalPages: number = 0;
    currentPage: number = 1;
    pagination: number = 1;
    isLoad: boolean = false;


  constructor(private api: UserService, private _snackBar: MatSnackBar) {}

  openSnackBar(displayMessage: string, buttonText: string, type: string, style: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data:{
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


  insertUser() {
    this.isLoad = true;
    const { name, login, password, active, contact, usergroup } = this.formData;
    this.api
      .insertUser(name, login, password, active, contact, usergroup)
      .then((response) => {
          this.users = response.data; // Armazene os usuários na variável 'usuarios'
          this.totalUsers = response.users;
          this.totalPages = response.total_pages;
          this.currentPage = response.current_page;
          // this.isLoad = false;

            if (response.status === true) {
              this.openSnackBar('Registro criado com sucesso', 'Ok',  'Sucesso!', 'success-snackbar');
            }else{
              this.openSnackBar('Preencha todos os campos', 'Ok',  'Erro!', 'error-snackbar');
              this.isLoad = false;
          }
        })
        .catch((error) => {
          this.isLoad = false;
          console.error('Erro de login:', error);
        });
      // );
  }
}
