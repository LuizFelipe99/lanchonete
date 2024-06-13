import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-form-details',
  templateUrl: './dialog-form-details.component.html',
  styleUrls: ['./dialog-form-details.component.scss']
})
export class DialogFormDetailsComponent {

  // variavel para manipular os dados recebidos
  // variavel conteúdo para controlar os dados
  content: any;

  constructor( public dialogRef: MatDialogRef<DialogFormDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,){}

  ngOnInit():void{
    // aqui eu digo que o meu " conteudo ( content) " é igual ao obj que recebo do componente pai ( data )
    this.content = this.data;
  }

  cancel(): void {
    // garante que sempre o indetifier ficará sempre limpo
    localStorage.removeItem('identifier');
    // localStorage.removeItem('id_order_supplier');
    this.dialogRef.close();
  }

}
