import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalModel } from '../models/modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _show = new BehaviorSubject<boolean>(false);
  private _data = new BehaviorSubject<ModalModel>({} as ModalModel);

  // Observables públicos para suscribirse
  show$ = this._show.asObservable();
  data$ = this._data.asObservable();

  // Abrir modal con datos
  open(data: any) {
    this._data.next(data);
    this._show.next(true);
  }

  // Cerrar modal
  close() {
    this._show.next(false);
    this._data.next({} as ModalModel);
  }
}
