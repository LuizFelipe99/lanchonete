import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lanchonete';

  get login(): string {
    return localStorage.getItem('login') || ''; // Obter o nome do usuário do localStorage
  }
}
