import { Injectable } from '@angular/core';

import Swal, { SweetAlertResult } from 'sweetalert2';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {

  constructor(private toastr: ToastrService) { }

  error(mensaje: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje
    });
  }

  confirmar(mensaje: any): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: mensaje.titulo,
      text: mensaje.cuerpo,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      allowOutsideClick: false,
      confirmButtonText: `Aceptar`,
      cancelButtonText: `Cancelar`,
    })
  }

  exito(mensaje: string): ActiveToast<any> {
    return this.toastr.success(mensaje);
  }

  errorToast(mensaje: string): ActiveToast<any> {
    return this.toastr.error(mensaje);
  }
}

