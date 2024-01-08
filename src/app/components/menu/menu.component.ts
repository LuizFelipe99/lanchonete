import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
opened = true;
get usuario(): string {
  return localStorage.getItem('login') || ''; // Obter o nome do usuário do localStorage
}

constructor(private router: Router) {}

logout(): void {
  localStorage.clear();
  // Redirecionar para a rota de login
  this.router.navigate(['/login']);
}
}
