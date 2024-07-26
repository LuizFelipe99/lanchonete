import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogFormDetailsComponent } from 'src/app/components/shared/dialog-form-details/dialog-form-details.component';
import { GlobalService } from 'src/app/global.service';
import { Snack, SnackFilter } from 'src/app/models/Snack/snack.models';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  selector: 'app-edit-snack',
  templateUrl: './edit-snack.component.html',
  styleUrls: ['./edit-snack.component.scss']
})
export class EditSnackComponent {
  ngOnInit(): void {
    this.getSnackById();
  }
  //colocando o valor que vem por localstorage na varaivel identity, que poderá ser usada para realizar outras funções, como salvar
  get identity(): string {
    return localStorage.getItem('identifier') || ''; // Obter o nome do usuário do localStorage
  }

  constructor(private api: SnackService, public globalService: GlobalService, public dialogRef: MatDialogRef<DialogFormDetailsComponent>) {}

// objeto para receber os dados da api
  snacks: Snack[];
  filterSnack: SnackFilter = {id_snack: this.identity}
  newSnack: Snack = {id_snack: this.identity ,name: '', description: '', price: ''};
  isLoad: boolean = false;

   // Método para filtro e paginação
  getSnackById() {
    this.isLoad = true;
    this.api.getSnackById(this.filterSnack).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.snacks = data.data; // Armazene os lanches na variável 'lanches'
        this.newSnack.name = this.snacks[0].name;
        this.newSnack.description = this.snacks[0].description;
        this.newSnack.price = this.snacks[0].price;
        this.isLoad = false;
      }
    });
}

  // função que atualiza o cadastro
  updateSnack() {
    console.log(this.newSnack);
    this.isLoad = true;
    this.api.updateSnack(this.newSnack, this.identity).subscribe(createSnack => {
      if ('error' in createSnack) {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
      this.isLoad = false;
      } else {
        this.globalService.openSnackBar('Registro alterado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.isLoad = false;
      }
    },
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
