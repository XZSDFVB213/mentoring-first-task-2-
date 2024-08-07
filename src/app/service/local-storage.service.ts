import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
  }

  getItem(key: string): any {
    const jsonString = localStorage.getItem(key);
    return jsonString ? JSON.parse(jsonString) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
