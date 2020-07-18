import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Output,
  Input,
  Type,
  ComponentFactoryResolver,
  AfterViewInit,
} from '@angular/core';
import { SlideInService, SlideInState } from './slide-in.service';
import { fromEvent, Subject, Observable } from 'rxjs';
import { filter, tap, takeUntil, map } from 'rxjs/operators';
import { ContentHostDirective } from '../directives/content-host/content-host.directive';

@Component({
  selector: 'hwa-slide-in',
  templateUrl: './slide-in.component.html',
  styleUrls: ['./slide-in.component.scss'],
})
export class SlideInComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(ContentHostDirective, { static: true })
  modalContentHost: ContentHostDirective;
  @Output() saveClicked: EventEmitter<any>;
  @Output() deleteClicked: EventEmitter<any>;
  @Output() closeClicked: EventEmitter<any>;
  @Input() content: {
    component: Type<any>;
    formData: any;
    heading: string;
    showDelete: boolean;
  };
  destroyed$ = new Subject();

  formIsInvalid$: Observable<any>;

  private loadedComponent: any;
  private clickedOutside$ = fromEvent(window, 'click').pipe(
    filter((ev: any) => {
      return ev.target.id.includes('slide-in-container');
    })
  );

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.saveClicked = new EventEmitter<any>();
    this.deleteClicked = new EventEmitter<any>();
    this.closeClicked = new EventEmitter<any>();
  }

  ngOnInit() {
    this.loadComponent();

    setTimeout(() => {
      this.clickedOutside$
        .pipe(
          tap((_) => this.close()),
          takeUntil(this.destroyed$)
        )
        .subscribe();
    });
  }

  ngAfterViewInit() {
    this.formIsInvalid$ = this.loadedComponent.instance.formIsValid$.pipe(
      map((valid: boolean) => !valid),
      takeUntil(this.destroyed$)
    );
  }

  private loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.content.component
    );
    const viewContainerRef = this.modalContentHost.viewContainerRef;
    viewContainerRef.clear();

    this.loadedComponent = viewContainerRef.createComponent(componentFactory);
    this.loadedComponent.instance.formData = this.content.formData;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  save() {
    this.loadedComponent.instance.formSubmit((formValues: any) =>
      this.saveClicked.emit(formValues)
    );
  }

  delete() {
    this.deleteClicked.emit({});
  }

  close() {
    this.closeClicked.emit({});
  }
}
