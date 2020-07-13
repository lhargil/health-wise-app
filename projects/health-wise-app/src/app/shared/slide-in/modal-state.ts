import { Type, EventEmitter } from '@angular/core';

export const enum ModalModes {
  Create,
  Update,
}

export interface ModalState {
  heading: string;
  formData: any;
  modalMode: ModalModes;
  component: Type<any>;
  handleSave: (eventData: string) => void;
  handleDelete?: (eventData: string) => void;
}

export interface IFormModal {
  saveClicked: EventEmitter<any>;
  deleteClicked: EventEmitter<any>;
  closeClicked: EventEmitter<any>;
  content: {
    component: Type<any>;
    formData: any;
    heading: string;
    showDelete: boolean;
  };
}
