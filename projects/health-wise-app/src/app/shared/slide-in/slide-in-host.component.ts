import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ContentHostDirective } from '../directives/content-host/content-host.directive';
import { SlideInService } from './slide-in.service';
import { SlideInComponent } from './slide-in.component';
import { ModalState, ModalModes } from './modal-state';

@Component({
  selector: 'hwa-slide-in-host',
  templateUrl: './slide-in-host.component.html',
  styleUrls: ['./slide-in-host.component.scss'],
})
export class SlideInHostComponent implements OnInit {
  @ViewChild(ContentHostDirective, { static: true })
  contentHost: ContentHostDirective;

  constructor(
    private slideInService: SlideInService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.slideInService.notification$.subscribe(
      this.handleModalNotifications()
    );
  }

  private handleModalNotifications(): (modalState: ModalState) => void {
    return (modalState) => {
      const refs = this.loadSlideInComponent(SlideInComponent);

      this.toggleBodyScroll(true);

      refs.component.closeClicked.subscribe((_: any) => {
        this.dismissModal(refs);
      });
      refs.component.saveClicked.subscribe((eventData: string) => {
        modalState.handleSave(eventData);
        this.dismissModal(refs);
      });
      if (modalState.handleDelete) {
        refs.component.deleteClicked.subscribe((eventData: any) => {
          if (modalState.handleDelete) {
            modalState.handleDelete(eventData);
          }
          // this.dialogService.confirm({
          //   heading: modalState.dialog.heading,
          //   message: modalState.dialog.message,
          //   callback: affirmativeAnswer => {
          //     if (affirmativeAnswer) {
          //       modalState.handleDelete(eventData);
          //       this.dismissModal(refs);
          //     }
          //   }
          // });
        });
      }
      refs.component.content = {
        component: modalState.component,
        formData: modalState.formData,
        heading: modalState.heading,
        showDelete: modalState.modalMode == ModalModes.Update,
      };
    };
  }

  private dismissModal(refs: {
    component: SlideInComponent;
    viewContainerRef: ViewContainerRef;
  }) {
    refs.viewContainerRef.clear();
    this.toggleBodyScroll(false);
  }

  private loadSlideInComponent(componentToRender: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentToRender
    );

    const viewContainerRef = this.contentHost.viewContainerRef;
    viewContainerRef.clear();

    return {
      component: viewContainerRef.createComponent(componentFactory)
        .instance as SlideInComponent,
      viewContainerRef,
    };
  }

  private toggleBodyScroll(toggledOn: boolean) {
    if (toggledOn) {
      document.querySelector('body')?.classList.add('modal-open');
    } else {
      document.querySelector('body')?.classList.remove('modal-open');
    }
  }
}
