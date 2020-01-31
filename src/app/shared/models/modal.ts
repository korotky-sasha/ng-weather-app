import { Type } from '@angular/core';

export interface Modal {
  isOpen: boolean;
  modalContent: null | Type<any>;
  options: any;
}
