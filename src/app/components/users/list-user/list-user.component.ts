import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/global.service'; 

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  constructor(private api: UserService, private _snackBar: MatSnackBar, public globalService: GlobalService) {}


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
    perPage: 15,
  };

  users: any[] = [];
  totalUsers: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pagination: number = 1;
  isLoad: boolean = false;




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
            this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
            this.isLoad = false;
        }
        },
        (error: any) => {
          this.isLoad = false;
          console.error('Erro ao buscar usuários:', error);
        }
      );
  }


}
