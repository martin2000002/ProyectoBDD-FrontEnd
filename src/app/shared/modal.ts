import { Component } from '@angular/core';
import { ModalService } from '../core/services/modal.service';
import { CommonModule } from '@angular/common';
import { ModalModel } from '../core/models/modal.model';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  imports: [CommonModule]
})
export class ModalComponent {

  show = false;
  data = {} as ModalModel;

  scrolled = false;

  onScroll(event: any) {
    this.scrolled = event.target.scrollTop > 0;
  }

  constructor(private modalService: ModalService) {
    this.modalService.show$.subscribe(show => this.show = show);
    this.modalService.data$.subscribe(data => this.data = data);
  }

  close() {
    this.modalService.close();
  }
}
