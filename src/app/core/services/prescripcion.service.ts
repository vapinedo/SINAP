import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class PrescripcionService {

    private data = [
        {
            id: 1,
            nombre: 'Año 2020-1',
												periodo :'2 años',
												concepto :'Tasa IP',
												fechaVigencia : '2020/07/01',
												fechaCreacion: '2020/06/02',
												creadoPor: 'Osiris Galindo',
												estado : 'Activos'


        },
								{
									id: 2,
									nombre: 'Año 2020-3',
									periodo :'3 años',
									concepto :'Tasa IP',
									fechaVigencia : '2020/07/01',
									fechaCreacion: '2020/06/02',
									creadoPor: 'Osiris Galindo',
									estado : 'Inactivo'


					}
    ];

    constructor() { }

    getAll(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.data);
                observer.complete();
            }, 1000)
        });
    }
}
