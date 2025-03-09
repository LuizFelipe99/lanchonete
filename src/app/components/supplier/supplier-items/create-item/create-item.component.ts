import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Item } from 'src/app/models/Item-Supplier/item.models';
import { ItemSupplierService } from 'src/app/services/item-supplier.service';
import { Category } from 'src/app/models/Category/category.models';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  isLoad: boolean = false;
  items: Item[] = [];
  newItem: Item = { name: '', description: '', category: '', min_stock: '', sale_price: '' };
  category_names: Category[];
  selectedFile: File | null = null;

  constructor(
    private api: ItemSupplierService,
    private globalService: GlobalService,
    private categoryName: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategoryName();
  }

  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //   }
  // }
  selectedFileName: string = 'Nenhum arquivo selecionado';
  imagePreview: string | ArrayBuffer | null = null; // Variável para armazenar a prévia da imagem
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.selectedFile = file; // Salva o arquivo para envio posterior
  
      // Criar um preview da imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Salva o preview na variável
      };
      reader.readAsDataURL(file); // Converte a imagem para base64
    }
  }
  
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  


  insertItem(): void {
    if (!this.newItem.name || !this.newItem.description || !this.newItem.category) {
      this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
      return;
    }

    this.isLoad = true;
    const formData = new FormData();
    formData.append('name', this.newItem.name || '');
    formData.append('description', this.newItem.description || '');
    formData.append('category', this.newItem.category || '');
    formData.append('min_stock', (this.newItem.min_stock ?? '').toString());
    formData.append('sale_price', (this.newItem.sale_price ?? '').toString());
    

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.api.insertItem(formData).subscribe(response => {
      if ('error' in response) {
        this.globalService.openSnackBar('Erro ao criar o item', 'Ok', 'Erro!', 'error-snackbar');
      } else {
        this.globalService.openSnackBar('Item criado com sucesso!', 'Ok', 'Sucesso!', 'success-snackbar');
      }
      this.isLoad = false;
      this.globalService.veryTokenExpired(response);
    });
  }

  getCategoryName(): void {
    this.categoryName.getCategoryName().subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok', 'Erro!', 'error-snackbar');
      } else {
        this.category_names = data.data;
      }
      this.globalService.veryTokenExpired(data);
    });
  }
}
