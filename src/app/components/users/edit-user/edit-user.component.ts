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
  // variaveis para controlar paginação
  page: number = 1;
  totalUsers: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  isLoad: boolean = false;


// passando a pagina por parametro para a paginação
// a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
getUserById(){
    this.isLoad = true;
    this.api.getUserById(this.filterUser).subscribe(data => {
      if ('error' in data){
        this.globalService.openSnackBar('Não foi encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
      }else{
        this.users = data.data;
        this.totalPages = data.total_pages;
        this.currentPage = data.current_page;
        this.totalUsers = data.users;
        this.isLoad = false;
      }
    });
  }


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
  
  // updateUserr() {
  //   // const {id_user, name, login, password, active, contact, usergroup} = this.formData;
  //   this.api.updateUser(id_user, name, login, password, active, contact, usergroup).then((response) => {this.user = response.data;
  //     if (response.status === true) {
  //       this.globalService.openSnackBar('Registro alterado com sucesso', 'Ok',  'Sucesso!', 'success-snackbar');
  //       this.getUserById();
  //     } else {
  //       this.globalService.openSnackBar('Preencha todos os campos', 'Ok',  'Erro!', 'error-snackbar');
  //       this.isLoad = false;
  //     }},
  //     (error: any) => {
  //       console.error('Erro ao alterar usuário: ', error);
  //     })
  // }

  cancel(): void {
    this.dialogRef.close();
  }



  formData: {
      id_user: string;
      name: string;
      login: string;
      password: string;
      active: number;
      contact: string;
      usergroup: number
    } =
    {
      id_user: this.identity,
      name: '',
      login: '',
      password: '',
      active: 1,
      contact: '',
      usergroup: 1
    };

  // // objeto para receber os dados da api
  user: any[] = [];
  // isLoad: boolean = false;

  //  // Método para filtro e paginação
  // getUserById() {
  //   this.isLoad = true;
  //   this.api.getUserById(this.identity).then((response) => {
  //         this.user = response.data; // Armazene os usuários na variável 'usuarios'
  //         this.formData.name = response.data[0].name;
  //         this.formData.login = response.data[0].login;
  //         this.formData.password = response.data[0].password;
  //         this.formData.active = response.data[0].active;
  //         this.formData.contact = response.data[0].contact;
  //         this.formData.usergroup = response.data[0].usergroup;
  //         // daí a gente faria assim..
  //         this.isLoad = false;
  //         if (response.status === true) {
  //         }else{
  //           // this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
  //           this.isLoad = false;
  //       }
  //       },
  //       (error: any) => {
  //         // this.isLoad = false;
  //         console.error('Erro ao buscar usuários:', error);
  //       })
  // }





  

}
