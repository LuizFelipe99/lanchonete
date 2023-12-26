import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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

  hide = true;

  durationInSeconds = 3; // tempo de duração do snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //posição horizontal
  verticalPosition: MatSnackBarVerticalPosition = 'top'; // posição vertical



  constructor(private _snackBar: MatSnackBar, private authService: AuthService, private router: Router) {}


  login() {
    const { login, password } = this.formData; // Use 'login' ao invés de 'login' para corresponder ao objeto esperado pelo backend.
    this.authService
      .login(login, password)
      .then((response) => {
        if (response.status === true) {
          console.log(response.status);
          localStorage.setItem('login', response.data[0].login); // Salvar o nome do usuário no localStorage
          localStorage.setItem('id_user', response.data[0].id);
          localStorage.setItem('active', response.data[0].active);
          this.router.navigate(['/home']); // Redirecionar para a página inicial (home) após o login bem-sucedido
          this.openSnackBar('Usuário logado com sucess.', 'Ok',  'Sucesso!', 'success-snackbar');
        } else {
          // this.isLoad = false;
          // this.loginError = true;
          this.openSnackBar('Erro ao se autenticar.', 'Ok',  'Erro!', 'error-snackbar');
        }
      })
      .catch((error) => {
        // this.isLoad = false;
        console.error('Erro de login:', error);
      });
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
