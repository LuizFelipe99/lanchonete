import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  get usuario(): string {
    return localStorage.getItem('login') || ''; // Obter o nome do usuário do localStorage
  }

// pegando o grupo do usuario na sessao
  get usergroup(): string {
    return localStorage.getItem('usergroup') || ''; // Obter o nome do usuário do localStorage
  }

  // itens do menu para exibir
menu_items_config = [
  { title: "Configurações", url: "/home"},
  { title: "Perfil", url: "/usuarios/listar"}
]

  showAdminMenu: boolean = false;
  
  opened = true;
  constructor(private router: Router) {}
  panelOpenState = false;

  ngOnInit(){
    this.veriryGroupUser();
  }

  logout(): void {
    localStorage.clear();
    // Redirecionar para a rota de login
    this.router.navigate(['/login']);
  }

  veriryGroupUser(){
    if(this.usergroup == '1'){
      this.showAdminMenu = true;
    }
  }
}
