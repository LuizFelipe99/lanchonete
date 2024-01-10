import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  setUserDash = true;
  setCategoryDash = true;
  label_button = "Desativar"


  inactiveDash(){
    this.setUserDash = !this.setUserDash;
    this.setCategoryDash = !this.setCategoryDash;
    this.label_button = this.label_button === 'Habilitar' ? 'Desabilitar' : 'Habilitar';
  }
}
