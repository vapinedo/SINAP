import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalizar'})
export class CapitalizarPipe implements PipeTransform {

  transform(cadena: string): string {
    if (cadena) {
      cadena = cadena.toLowerCase();
      
      if (cadena.includes('_')) {
        cadena = cadena.replace("_", " ");
      } 
      if (cadena.includes('-')) {
        cadena = cadena.replace("_", " ");
      }
      if (cadena.includes('annio')) {
        cadena = cadena.replace("annio", "año");
      }
      if (cadena.includes('circulacion')) {
        cadena = cadena.replace("circulacion", "circulación");
      }
      if (cadena.includes('vehiculo')) {
        cadena = cadena.replace("vehiculo", "vehículo");
      }
      if (cadena.includes('inscripcion')) {
        cadena = cadena.replace("inscripcion", "inscripción");
      }
  
      return cadena.charAt(0).toUpperCase() + cadena.slice(1);
    }
    return cadena;
  }

}