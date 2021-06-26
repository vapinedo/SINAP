import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  keyExists(key: string): boolean {
    const item = localStorage.getItem(key);
    return (item !== null) ? true : false;
  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }   

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }  

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  } 

  clear(): void {
    localStorage.clear();
  }
}