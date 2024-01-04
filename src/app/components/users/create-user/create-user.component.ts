import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/global.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  // pegando o login na localstorage para fazer um ngif no botao de " voltar pois o componente também é utilizado quando o usuario nao esta logado"
  get login(): string {
    return localStorage.getItem('login') || ''; // Obter o nome do usuário do localStorage
  }
  isLoad: boolean = false;

  users: User[] = [];
  newUser: User = {
    name: '',
    login: '',
    password: '',
    active: 0,
    contact: '',
    usergroup: 0,
    // Preencha outras propriedades conforme necessário
  };

  constructor(private api: UserService, private globalService: GlobalService) {}


  insertUser(): void {
    this.isLoad = true;
    this.api.insertUser(this.newUser).subscribe(createUser => {
      // console.log('Novo usuario cadastrado:', createUser);
      if ('error' in createUser){
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
      }else{
        this.globalService.openSnackBar('Registro criado com sucesso', 'Ok',  'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
    },
    );
  }
}
