import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }
  saveArray(key: string, array: any[]): void {
    localStorage.setItem(key, JSON.stringify(array));
  }

  // Получить массив
  getArray(key: string): any[] {
    const storedArray = localStorage.getItem(key);
    return storedArray ? JSON.parse(storedArray) : [];
  }

  // Удалить массив
  removeArray(key: string): void {
    localStorage.removeItem(key);
  }
}
