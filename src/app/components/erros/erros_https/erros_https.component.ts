import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/auth/error.service';

@Component({
  selector: 'app-error404',
  templateUrl: './erros_https.component.html',
  styleUrls: ['./erros_https.component.scss']
})
export class ErrorHttpsComponent {
  errorCode: number = 0;
  errorMessage: string = 'Erro não especificado';

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    const error = this.errorService.getError();
    if (error) {
      this.errorCode = error.code;
      this.errorMessage = error.message;
    } else {
      // Redirecionar ou exibir uma mensagem padrão
      this.errorCode = 0;
      this.errorMessage = 'Erro desconhecido.';
    }
  }

}
