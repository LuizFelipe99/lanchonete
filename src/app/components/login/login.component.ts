import { Component } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formData: { login: string; password: string } = {
    login: '',
    password: '',
  };

  // controla a visualização da senha no form
  hide = true;
<<<<<<< HEAD
  hidPassword(){
    console.log(this.hide);
    this.hide = !this.hide;
  }
  isLoad = false;
=======
hidPassword(){
  console.log(this.hide);
  this.hide = !this.hide;
}
>>>>>>> 2dd795801cd24ebaaba6d2c6d41759a7c83126d8


  constructor(private _snackBar: MatSnackBar, private authService: AuthService, private router: Router, private globalService: GlobalService) {}


  login() {
<<<<<<< HEAD
    this.isLoad = true;
=======
>>>>>>> 2dd795801cd24ebaaba6d2c6d41759a7c83126d8
    const { login, password } = this.formData; // Use 'login' ao invés de 'login' para corresponder ao objeto esperado pelo backend.
    this.authService
      .login(login, password)
      .then((response) => {
        if (response.status === true) {
          console.log(response.status);
          localStorage.setItem('login', response.data[0].login); // Salvar o nome do usuário no localStorage
          localStorage.setItem('token', response.data[0].token); // Salvar o nome do usuário no localStorage
          localStorage.setItem('id_user', response.data[0].id_user);
          localStorage.setItem('active', response.data[0].active);
          localStorage.setItem('usergroup', response.data[0].usergroup);
          this.router.navigate(['/home']); // Redirecionar para a página inicial (home) após o login bem-sucedido
          this.globalService.openSnackBar('Usuário logado com sucess.', 'Ok',  'Sucesso!', 'success-snackbar');
          // this.openSnackBar('Usuário logado com sucess.', 'Ok',  'Sucesso!', 'success-snackbar');
<<<<<<< HEAD
          this.isLoad = false;
        } else {
          this.isLoad = false;
=======
        } else {
          // this.isLoad = false;
>>>>>>> 2dd795801cd24ebaaba6d2c6d41759a7c83126d8
          // this.loginError = true;
          this.globalService.openSnackBar('Erro ao se autenticar.', 'Ok',  'Erro!', 'error-snackbar');
        }
      })
      .catch((error) => {
        // this.isLoad = false;
        console.error('Erro de login:', error);
      });
  }


}
