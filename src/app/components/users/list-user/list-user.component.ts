import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GlobalService } from 'src/app/global.service'; 
import { User, UserFilter } from 'src/app/models/User/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  constructor(private api: UserService, public globalService: GlobalService) {}

  users: User[];
  filterUser: UserFilter = { name: '', login: '', active: 1, per_page: 15};

  // variaveis para controlar paginação
  page: number = 1;
  totalUsers: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  isLoad: boolean = false;

  ngOnInit(): void {
    // ao carregar componente é executado a função getUser para listar tudo e passando a pagina por parametro
    // como a pagina até entao é 1 ele sempre vai carregar na primeira pagina
    this.getUsers(this.page);

  }

// passando a pagina por parametro para a paginação
// a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
  getUsers(page: number){
    this.isLoad = true;
    this.api.getUsers(this.filterUser, page).subscribe(data => {
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

}
