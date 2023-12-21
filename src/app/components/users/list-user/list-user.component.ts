import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  durationInSeconds = 3; // tempo de duração do snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //posição horizontal
  verticalPosition: MatSnackBarVerticalPosition = 'top'; // posição vertical

  // Objeto para o formulário de filtro
  formData: {
    name: string;
    login: string;
    active: number;
    perPage: number;
  } = {
    name: '',
    login: '',
    active: 4,
    perPage: 10,
  };

  users: any[] = [];
  totalUsers: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pagination: number = 1;
  isLoad: boolean = false;


  constructor(private api: UserService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getUsers(this.pagination);
  }

  // Método para filtro e paginação
  getUsers(pagination: number) {
    this.isLoad = true;
    const { name, login, active, perPage } = this.formData;
    this.api
      .getUsers(name, login, active, pagination, perPage)
      .then(
        (response) => {
          this.users = response.data; // Armazene os usuários na variável 'usuarios'
          this.totalUsers = response.users;
          this.totalPages = response.total_pages;
          this.currentPage = response.current_page;
          this.isLoad = false;
          if (response.status === true) {
          }else{
            this.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
            this.isLoad = false;
        }
        },
        (error: any) => {
          this.isLoad = false;
          console.error('Erro ao buscar usuários:', error);
        }
      );
  }


  

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
}
