import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toastrService: ToastrService) { }

  info(msg: string = "") {
    this._toastrService.info(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Informação</b> - ${msg}</span>`,
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }

  success(msg: string = "Ação realizada com sucesso") {
    this._toastrService.success(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Sucesso</b> - ${msg}</span>`,
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }

  warning(msg: string = "Ação realizada com alertas") {
    this._toastrService.warning(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Alerta</b> - ${msg}.</span>`,
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }

  error(msg: string = "Ocorreu um erro, contrate o administrador do sistema!") {
    this._toastrService.error(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Erro</b> - ${msg}.</span>`,
      "",
      {
        timeOut: 4000,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }
}
