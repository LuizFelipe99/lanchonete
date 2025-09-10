import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';
import { UserFilter, usersAccess } from 'src/app/models/Dashboard/users-access.model';

@Component({
  selector: 'app-users-access',
  templateUrl: './users-access.component.html',
  styleUrls: ['./users-access.component.scss']
})
export class UsersAccessComponent {

  constructor(private api: DashBoard, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.getUsersAccess(this.page);
  }

  users: usersAccess[] = [];
  filterUser: UserFilter = {
    name: '',
    login: '',
    dt_login_de: '',
    dt_logou_ate: '',
    request: '',
    ip: '',
    user_status: '' // padrão "Todos"
  };

  // variáveis para controlar paginação
  page: number = 1;
  totalUsers: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  isLoad: boolean = false;

  getUsersAccess(page: number) {
    this.isLoad = true;
    this.api.getUsersAccess(this.filterUser, page).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.users = data.data;
        this.totalUsers = data.total_records;
        this.totalPages = data.total_pages;
        this.currentPage = data.page;
        this.isLoad = false;
      }
      this.globalService.veryTokenExpired(data);
    });
  }

  // Limpar filtros
  clearFilters() {
    this.filterUser = {
      name: '',
      login: '',
      dt_login_de: '',
      dt_logou_ate: '',
      request: '',
      ip: '',
      user_status: ''
    };
    this.getUsersAccess(1); // opcional: já buscar após limpar
  }

}
