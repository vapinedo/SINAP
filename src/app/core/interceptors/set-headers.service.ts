import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { ERROR_CONECTIVIDAD, ERROR_GENERICO } from '@core/utils/Mensajes';

@Injectable()
export class SetHeadersService implements HttpInterceptor {
	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const headers = new HttpHeaders({ Authentication: 'sample-token' });
		const requestClone = req.clone({ headers }); // here, we can also add params

		return next.handle(requestClone).pipe(catchError(this.errorHandler));
	}

	errorHandler(error: HttpErrorResponse) {
		let errorMessage = '';
		console.log('Error:', error);
		if (error.status !== 0) {

			if (error.error instanceof ErrorEvent) {
				errorMessage = `Error: ${error.error.message}`;
			} else {
				if (error.error instanceof Array) {
					errorMessage = ERROR_GENERICO;
				} else {
					errorMessage = `${error.error.message}`;
				}
			}
			return throwError(errorMessage);
		}
		return throwError(ERROR_CONECTIVIDAD);
	}
}
