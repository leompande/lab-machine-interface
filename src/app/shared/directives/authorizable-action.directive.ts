import { Directive, TemplateRef, ViewContainerRef, Input, SimpleChanges, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[authorizable]'
  })
  export class AuthorizableActionDirective implements OnInit {
      role: string;
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
      ) {
      }

      ngOnInit() {
          this.updateView();
      }
    
      @Input()
      set authorizable(val) {
          this.role = val;
          this.updateView();
      }

      private updateView() {
        this.viewContainer.clear();
          const user = new Function("return "+localStorage.getItem("sb-user"))();
        if(this.role.indexOf(user.roleId)>=0) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
      }
  }