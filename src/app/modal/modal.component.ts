import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() closed = new EventEmitter();
  @Output() deleteConfirmed = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  modalClick() {
    this.closed.emit(true);
  }

  deleteCity() {
    this.deleteConfirmed.emit(true);
  }

}
