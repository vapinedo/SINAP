import { Component } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent {

  public menu: any[];
  public submenuActive: object;
  public sidedarIsOpen = false;
  public readonly logo = './assets/img/logo.png';
  
  constructor(
    private authSvc: AuthService,
    private SidebarSvc: SidebarService
  ) { 
    this.menu = SidebarSvc.menu;
  }

  onOpenSidebar(selectedItemMenu: object) {
    this.submenuActive = selectedItemMenu;
    this.sidedarIsOpen = true;
  }

  onCloseSidebar(): void {
    this.sidedarIsOpen = false;
  }
}