import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/global.service';
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


  constructor(private api: UserService, private _snackBar: MatSnackBar, private globalService: GlobalService) {}



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
              this.globalService.openSnackBar('Registro criado com sucesso', 'Ok',  'Sucesso!', 'success-snackbar');
            }else{
              this.globalService.openSnackBar('Preencha todos os campos', 'Ok',  'Erro!', 'error-snackbar');
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
