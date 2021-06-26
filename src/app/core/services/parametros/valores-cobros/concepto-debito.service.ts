import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class ConceptoDebitoService {

    private readonly RESPONSE_TIME = 1000;

    private data = [
        { 
            id: 1,
            nombre: 'Cobro 1',
            normativa: 'Decreto 100',
            descripcion: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
            cobroMulta: 'No',
            estado: 'Activo'
        },
        { 
            id: 2,
            nombre: 'Cobro 2',
            normativa: 'Ley 4322',
            descripcion: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
            cobroMulta: 'Si',
            estado: 'Inactivo'
        },
        { 
            id: 3,
            nombre: 'Cobro 3',
            normativa: 'Decreto 32',
            descripcion: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
            cobroMulta: 'Si',
            estado: 'Activo'
        },
        { 
            id: 4,
            nombre: 'Cobro 4',
            normativa: 'Ejemplo ley con un nombre largo',
            descripcion: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
            cobroMulta: 'No',
            estado: 'Inactivo'
        },
        { 
            id: 5,
            nombre: 'Cobro 5',
            normativa: 'Decreto 20',
            descripcion: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
            cobroMulta: 'Si',
            estado: 'Activo'
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