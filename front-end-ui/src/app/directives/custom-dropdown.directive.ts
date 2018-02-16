import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomDropdown]'
})
export class CustomDropdownDirective {
  private isOpen = false;
  constructor(private _el: ElementRef) {
  }

//  @HostBinding('class.show-custom') get opened() {
//      return this.isOpen;
//  }

  @HostListener('click') open() {
      this.isOpen = true;
  }

  @HostListener('mouseleave') close() {
    this.isOpen = false;
  }
}
