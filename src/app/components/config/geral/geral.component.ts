// settings.component.ts (exemplo)
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.scss']
})

export class GeralComponent implements OnDestroy {
  isLoad = false;

  settings = {
    primaryColor: '#3498db',
    secondaryColor: '#8e44ad',
    logoutButtonColor: '#ef4444', // cor do botão de sair (menu)
  };

  logoFile?: File;
  logoFileName = '';
  previewUrl?: string;

  onLogoChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.logoFile = file;
    this.logoFileName = file.name;

    if (this.previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.previewUrl = URL.createObjectURL(file);
  }

  save() {
    this.isLoad = true;
    // simulação
    setTimeout(() => { this.isLoad = false; }, 600);
  }

  reset() {
    this.settings = { primaryColor: '#3498db', secondaryColor: '#8e44ad',  logoutButtonColor: '#ef4444' };
    this.logoFile = undefined;
    this.logoFileName = '';
    if (this.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = undefined;
  }

  ngOnDestroy(): void {
    if (this.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(this.previewUrl);
  }
}