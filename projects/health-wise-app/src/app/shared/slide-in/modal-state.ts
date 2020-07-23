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
  handleSave: (eventData: any, afterSave?: () => void) => void;
  handleDelete?: (eventData: any, afterDelete?: () => void) => void;
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
