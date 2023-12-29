import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { UserService } from 'src/app/services/user.service';
import { DialogFormDetailsComponent } from '../../shared/dialog-form-details/dialog-form-details.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  formData: {id_user: string; name: string; login: string; password: string; active: number; contact: string;
     usergroup: number} = {id_user: this.identity, name: '', login: '', password: '', active: 1, contact: '', usergroup: 1};

  ngOnInit(): void {
    this.getUserById();
  }
  //colocando o valor que vem por localstorage na varaivel identity, que poderá ser usada para realizar outras funções, como salvar
  get identity(): string {
    return localStorage.getItem('identifier') || ''; // Obter o nome do usuário do localStorage
  }

  constructor(private api: UserService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>) {}

// objeto para receber os dados da api
  user: any[] = [];
  teste: any;


  isLoad: boolean = false;
   // Método para filtro e paginação
  getUserById() {
    this.isLoad = true;
    this.api.getUserById(this.identity).then((response) => {
          this.user = response.data; // Armazene os usuários na variável 'usuarios'
          // daí a gente faria assim..
          this.isLoad = false;
          if (response.status === true) {
          }else{
            // this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
            this.isLoad = false;
        }
        },
        (error: any) => {
          // this.isLoad = false;
          console.error('Erro ao buscar usuários:', error);
        })
  }

  updateUser() {
    const {id_user, name, login, password, active, contact, usergroup} = this.formData;
    this.api.updateUser(id_user, name, login, password, active, contact, usergroup).then((response) => {this.user = response.data;
      if (response.status === true) {
        this.globalService.openSnackBar('Registro alterado com sucesso', 'Ok',  'Sucesso!', 'success-snackbar');
      } else {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
      }},
      (error: any) => {
        console.error('Erro ao alterar usuário: ', error);
      })
  }

  msg(){
    this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
