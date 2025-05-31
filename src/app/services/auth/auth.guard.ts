import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ErrorService } from './error.service';
import { ROUTE_PERMISSIONS } from '../auth/permissions.config';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private errorService: ErrorService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const usergroup = localStorage.getItem('usergroup');
    const currentPath = state.url;

    if (!usergroup) {
      await this.router.navigate(['/login']);
      return false;
    }

    const routePermission = ROUTE_PERMISSIONS.find(p => p.path === currentPath);
    const allowedGroups = routePermission?.allowedGroups;

    if (!allowedGroups || !allowedGroups.includes(usergroup)) {
      this.errorService.setError(403, 'Você não tem permissão para acessar esta área.');
      await this.router.navigate(['/error']);
      return false;
    }

    return true;
  }
}
