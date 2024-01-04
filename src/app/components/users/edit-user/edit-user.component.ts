import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { UserService } from 'src/app/services/user.service';
import { DialogFormDetailsComponent } from '../../shared/dialog-form-details/dialog-form-details.component';
import { MatDialogRef } from '@angular/material/dialog';
import { User, UserFilter } from 'src/app/models/User/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  //colocando o valor que vem por localstorage na varaivel identity, que poderá ser usada para realizar outras funções, como salvar
  get identity(): string {
    return localStorage.getItem('identifier') || ''; // Obter o nome do usuário do localStorage
  }

  ngOnInit(): void {
    this.getUserById();
  }
  // metodo construtor
  constructor(private api: UserService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>) {
  }

  users: User[];
  filterUser: UserFilter = { id_user: this.identity};
  newUser: User = {name: '', login: '', password: '', active: 0, contact: '', usergroup: 0};
  isLoad: boolean = false;

// função que chama o usuario clicado enviando somente o id
getUserById(){
    this.isLoad = true;
    this.api.getUserById(this.filterUser).subscribe(data => {
      if ('error' in data){
        this.globalService.openSnackBar('Não foi encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
      }else{
        this.users = data.data;
        this.newUser.name = this.users[0].name;
        this.newUser.login = this.users[0].login;
        this.newUser.password = this.users[0].password;
        this.newUser.active = this.users[0].active;
        this.newUser.contact = this.users[0].contact;
        this.newUser.usergroup = this.users[0].usergroup;
        this.isLoad = false;
      }
    });
  }
  
// função que atualiza o cadastro
  updateUser(){
    console.log(this.newUser);
    this.isLoad = true;
    this.api.updateUser(this.newUser, this.identity).subscribe(createUser => {
      // console.log('Novo usuario cadastrado:', createUser);
      if ('error' in createUser){
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
      }else{
        this.globalService.openSnackBar('Alterado com sucesso', 'Ok',  'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
    },
    );
  }
  
  cancel(): void {
    this.dialogRef.close();
  }

}
