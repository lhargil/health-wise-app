import { Observable } from 'rxjs';

export interface IFormShell<T> {
  formData: T;
  formIsValid$: Observable<boolean>;
  formSubmit: (callback: (data: T) => void) => void;
}
