import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';

import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { HostDirective } from '../../directives/host.directive';

import { closeModal, getModalContent } from '../../store/modal';

import { State } from '../../shared/models';


@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit {
  @ViewChild(HostDirective, {static: true}) contentHost: HostDirective;

  constructor(
    private store: Store<State>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    this.store.select(getModalContent)
      .pipe(
        take(1)
      )
      .subscribe( value => {
      if (value) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(value);
        this.contentHost.viewContainerRef.createComponent(componentFactory);
      }
    });
  }

  modalClick() {
    this.store.dispatch(closeModal());
  }

}
