import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { GlobalService } from 'src/app/global.service';
import { DashBoard } from 'src/app/services/dashboard/dashboard.service';
import { UserFilter, usersAccess } from 'src/app/models/Dashboard/users-access.model';

@Component({
  selector: 'app-users-access',
  templateUrl: './users-access.component.html',
  styleUrls: ['./users-access.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }] // exibição dd/MM/yyyy no datepicker
})
export class UsersAccessComponent implements OnInit {

  constructor(private api: DashBoard, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.getUsersAccess(this.page);
  }

  users: usersAccess[] = [];

  // permita Date | string para os dois campos de data no form
  filterUser: UserFilter & { dt_login_de: Date | string; dt_logou_ate: Date | string } = {
    name: '',
    login: '',
    dt_login_de: '',
    dt_logou_ate: '',
    request: '',
    ip: '',
    user_status: ''
  };

  // paginação/estado
  page = 1;
  totalUsers = 0;
  totalPages = 0;
  currentPage = 1;
  isLoad = false;

  /** Converte Date | string (dd/MM/yyyy ou ISO) para yyyy-MM-dd (o que o backend espera) */
  private toISODate(v: Date | string): string {
    if (!v) return '';
    let d: Date;

    if (v instanceof Date) {
      d = v;
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) { // dd/MM/yyyy
      const [dd, mm, yyyy] = (v as string).split('/');
      d = new Date(+yyyy, +mm - 1, +dd);
    } else {
      d = new Date(v);
    }

    if (isNaN(d.getTime())) return '';
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  getUsersAccess(page: number) {
    this.isLoad = true;

    // monta payload convertendo datas para yyyy-MM-dd
    const payload: UserFilter = {
      ...this.filterUser,
      dt_login_de:  this.toISODate(this.filterUser.dt_login_de),
      dt_logou_ate: this.toISODate(this.filterUser.dt_logou_ate)
    } as any;

    this.api.getUsersAccess(payload, page).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
      } else {
        this.users = data.data;
        this.totalUsers = data.total_records;
        this.totalPages = data.total_pages;
        this.currentPage = data.page;
      }
      this.isLoad = false;
      this.globalService.veryTokenExpired(data);
    });
  }

  // exporta CSV usando a API de exportação (GET com query params)
  onExportCsv(): void {
    const filters = {
      ...this.filterUser,
      dt_login_de:  this.toISODate(this.filterUser.dt_login_de),
      dt_logou_ate: this.toISODate(this.filterUser.dt_logou_ate)
    } as any;

    this.api.exportUsersAccess(filters).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
        a.download = `users_access_${ts}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.globalService.openSnackBar('Falha ao exportar CSV', 'Ok', 'Erro!', 'error-snackbar');
        console.error('Export CSV error:', err);
      }
    });
  }

  // limpar filtros
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
    this.getUsersAccess(1);
  }
}
