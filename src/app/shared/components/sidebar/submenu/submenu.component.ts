import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnChanges {

  @Input() submenu: any;
  public submenuIsReady = false; 

  constructor() { }

  ngOnChanges() {
    this.submenuIsReady = true;
  }

}