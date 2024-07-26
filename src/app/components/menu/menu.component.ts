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
  { title: "Configurações", url: "/home"}, //path /configuracoes
  { title: "Perfil", url: "/usuarios/listar"}
]

// icones mais usados
search = "search"; // usado para listar
grading = "grading"; // usado para cadastrar

// menu home
menu_items_home = [
  {title: "Home", path: "/home", icon: "home"}
]

// menu de pedidos de cliente
menu_items_order_snack = [
  {title: "Listar Pedidos", path: "lanches/pedidos/listar", icon: this.search},
  {title: "Cadastrar Pedidos", path: "lanches/pedidos/criar", icon: this.grading},
]

menu_items_users = [
  {title: "Listar usuários", path: "/usuarios/listar", icon: this.search},
  {title: "Cadastrar usuários", path: "/usuarios/criar", icon: "group_add"}
]

menu_items_suppliers = [
  {title: "Listar fornecedores", path: "/fornecedores/listar", icon: this.search},
  {title: "Cadastrar fornecedores", path: "/fornecedores/criar", icon: "contact_page"}
]

menu_items_order_supplier = [
  {title: "Listar pedidos", path: "fornecedores/pedidos/listar", icon: this.search},
  {title: "Cadastrar pedidos", path: "fornecedores/pedidos/criar", icon: this.grading}
]

menu_items_item = [
  {title: "Listar intens", path: "/itens/listar", icon: this.search},
  {title: "Cadastrar intens", path: "/itens/criar", icon: this.grading},
  {title: "Baixa de intens", path: "/itens/baixa", icon: "cancel_presentation"}
]

menu_items_category = [
  {title: "Listar categorias", path: "/categorias/listar", icon: this.search},
  {title: "Cadastrar categorias", path: "/categorias/criar", icon: "category"}
]


  opened = true;
  showAdminMenu: boolean = false;
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
