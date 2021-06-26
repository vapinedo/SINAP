import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class DatosDePruebaService {

    private readonly TIEMPO_DE_REPUESTA = 1000;

    private data = [
        { 
            id: 1,
            campo1: 'Lorem ipsum',
            campo2: 'Lorem ipsum',
            campo3: 'Lorem ipsum',
            campo4: 'Lorem ipsum',
            campo5: 'Lorem ipsum',
        },
        { 
            id: 2,
            campo1: 'Lorem ipsum',
            campo2: 'Lorem ipsum',
            campo3: 'Lorem ipsum',
            campo4: 'Lorem ipsum',
            campo5: 'Lorem ipsum',
        },
        { 
            id: 3,
            campo1: 'Lorem ipsum',
            campo2: 'Lorem ipsum',
            campo3: 'Lorem ipsum',
            campo4: 'Lorem ipsum',
            campo5: 'Lorem ipsum',
        },
        { 
            id: 4,
            campo1: 'Lorem ipsum',
            campo2: 'Lorem ipsum',
            campo3: 'Lorem ipsum',
            campo4: 'Lorem ipsum',
            campo5: 'Lorem ipsum',
        },
        { 
            id: 5,
            campo1: 'Lorem ipsum',
            campo2: 'Lorem ipsum',
            campo3: 'Lorem ipsum',
            campo4: 'Lorem ipsum',
            campo5: 'Lorem ipsum',
        }
    ];

    constructor() { }

    getAll(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.data);
                observer.complete();
            }, this.TIEMPO_DE_REPUESTA)
        });
    }

    
    getById(id: number): Observable<any> {
        const resultado = this.data.find(item => item.id === id);
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(resultado);
                observer.complete();
            }, this.TIEMPO_DE_REPUESTA)
        });
    }

}