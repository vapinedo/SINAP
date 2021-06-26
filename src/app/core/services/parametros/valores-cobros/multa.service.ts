import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class MultaService {

    private readonly RESPONSE_TIME = 1000;

    private data = [
        { 
            id: 1,
            nombreMulta: 'Atraso pago tasa',
            conceptoCobro: 'Inscripción tardía',
            departamento: 'Atlántida',
            municipio: 'Arizona',
            tipoPlaca: 'Alquiler',
            tipoVehiculo: 'Automóvil',
            modoCobro: 'Moneda',
            valorMinimo: 250,
            valorMaximo: 500,
            periodicidad: 'Anual',
            cuotas: 11,
            valor: 3000,
            estado: false
        },
        { 
            id: 2,
            nombreMulta: 'Atraso pago tasa',
            conceptoCobro: 'Inscripción tardía',
            departamento: 'Atlántida',
            municipio: 'Arizona',
            tipoPlaca: 'Particular',
            tipoVehiculo: 'Automóvil',
            modoCobro: 'Moneda',
            valorMinimo: 250,
            valorMaximo: 500,
            periodicidad: 'Anual',
            cuotas: 11,
            valor: 3000,
            estado: false
        },
        { 
            id: 3,
            nombreMulta: 'Atraso pago tasa vial municipal',
            conceptoCobro: 'Tasa única anual',
            departamento: 'Colón',
            municipio: 'Trujillo',
            tipoPlaca: 'Alquiler',
            tipoVehiculo: 'Automóvil',
            modoCobro: 'Moneda',
            valorMinimo: 250,
            valorMaximo: 500,
            periodicidad: 'Anual',
            cuotas: 11,
            valor: 3000,
            estado: false
        },
        { 
            id: 4,
            nombreMulta: 'Lorem Ipsum',
            conceptoCobro: 'Tasa vial municipal',
            departamento: 'Coplán',
            municipio: 'Santa Rosa',
            tipoPlaca: 'Alquiler',
            tipoVehiculo: 'Automóvil',
            modoCobro: 'Moneda',
            valorMinimo: 250,
            valorMaximo: 500,
            periodicidad: 'Anual',
            cuotas: 11,
            valor: 3000,
            estado: false
        },
        { 
            id: 5,
            nombreMulta: 'Lorem Ipsum',
            conceptoCobro: 'Tasa vial municipal',
            departamento: 'Coplán',
            municipio: 'Santa Rosa',
            tipoPlaca: 'Particular',
            tipoVehiculo: 'Automóvil',
            modoCobro: 'Moneda',
            valorMinimo: 250,
            valorMaximo: 500,
            periodicidad: 'Anual',
            cuotas: 11,
            valor: 3000,
            estado: false
        },
        { 
            id: 6,
            nombreMulta: 'Lorem Ipsum',
            conceptoCobro: 'Inscripción tardía',
            departamento: 'Coplán',
            municipio: 'Santa Rosa',
            tipoPlaca: 'Alquiler',
            tipoVehiculo: 'Automóvil',
            modoCobro: 'Moneda',
            valorMinimo: 250,
            valorMaximo: 500,
            periodicidad: 'Anual',
            cuotas: 11,
            valor: 3000,
            estado: false
        }
    ];

    constructor() { }

    getAll(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.data);
                observer.complete();
            }, this.RESPONSE_TIME)
        });
    }

    getById(id: number): Observable<any> {
        const result = this.data.find(item => item.id === id);
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(result);
                observer.complete();
            }, this.RESPONSE_TIME)
        });
    }
}