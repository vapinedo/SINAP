import { Injectable } from '@angular/core';

@Injectable()
export class DatetimeService {

  extraerFechaAAMMDD(fecha: string): string {
    const fechaCorrecta = fecha.slice(0, 10);
    return fechaCorrecta;
  }
  
}
