import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { GlobalService } from 'src/app/global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private globalService: GlobalService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // O usuário está autenticado, permita o acesso à rota
      return true;
    } else {
      // O usuário não está autenticado, redirecione para a página de login
      this.router.navigate(['/login']);
      // this.globalService.can
      return false;
    }
  }
}