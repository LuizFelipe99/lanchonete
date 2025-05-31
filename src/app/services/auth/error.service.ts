import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private storageKey = 'app_error_data';

  setError(code: number, message: string): void {
    const errorData = { code, message };
    sessionStorage.setItem(this.storageKey, JSON.stringify(errorData));
  }

  getError(): { code: number, message: string } | null {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  clearError(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
