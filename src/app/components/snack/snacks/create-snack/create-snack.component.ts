import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Snack } from 'src/app/models/Snack/snack.models';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  selector: 'app-create-snack',
  templateUrl: './create-snack.component.html',
  styleUrls: ['./create-snack.component.scss']
})
export class CreateSnackComponent {
  isLoad: boolean = false;

  snacks: Snack[] = [];
  newSnack: Snack = {name: '', description: '', price: '',}

  constructor(private api: SnackService, private globalService: GlobalService) {}

  // função para criar lanche
  insertSnack(): void {
    this.isLoad == true;
    this.api.insertSnack(this.newSnack).subscribe(createSnack => {
      if ('error' in createSnack) {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');

        this.isLoad = false;
      }else{
        this.globalService.openSnackBar('Registro criado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
    })
  }
}
