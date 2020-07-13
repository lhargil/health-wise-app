import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[contentHost]',
})
export class ContentHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
