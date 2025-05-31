import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PERMISSIONS, PermissionEntry } from 'src/app/services/auth/permissions.config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  opened = true;
  panelOpenState = false;
  usergroup: string = localStorage.getItem('usergroup') || '';

  // Top menu (menu suspenso da logo)
  menu_items_config: PermissionEntry[] = [];

  // Menus por categoria
  menu_items_home: PermissionEntry[] = [];
  menu_items_order_snack: PermissionEntry[] = [];
  menu_items_users: PermissionEntry[] = [];
  menu_items_suppliers: PermissionEntry[] = [];
  menu_items_order_supplier: PermissionEntry[] = [];
  menu_items_item: PermissionEntry[] = [];
  menu_items_category: PermissionEntry[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filterMenusByUserGroup();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  filterMenusByUserGroup(): void {
    const group = this.usergroup;

    const filtered = ROUTE_PERMISSIONS.filter(p => p.allowedGroups.includes(group));

    this.menu_items_home = filtered.filter(p => p.category === 'home');
    this.menu_items_order_snack = filtered.filter(p => p.category === 'order_snack');
    this.menu_items_users = filtered.filter(p => p.category === 'users');
    this.menu_items_suppliers = filtered.filter(p => p.category === 'suppliers');
    this.menu_items_order_supplier = filtered.filter(p => p.category === 'order_supplier');
    this.menu_items_item = filtered.filter(p => p.category === 'items');
    this.menu_items_category = filtered.filter(p => p.category === 'category');
    this.menu_items_config = filtered.filter(p => p.category === 'config');
  }
}
