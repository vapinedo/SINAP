import { Component, OnInit } from '@angular/core';

import { SubSink } from 'subsink';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  private appName = 'SINAP';
  private subs = new SubSink();

  constructor(
    private titleSvc: Title,
    private breadcrumbSvc: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.subs.add(
      this.breadcrumbSvc.breadcrumbChanged
        .subscribe(crumbs => this.titleSvc.setTitle(this.createTitle(crumbs)))
    );
  }

  private createTitle(routesCollection: Breadcrumb[]): string {
    const title = this.appName;
    const titles = routesCollection.filter((route) => route.displayName);

    if (!titles.length) { return title; }
    
    const routeTitle = this.titlesToString(titles);
    return `${ routeTitle } ${ title }`;
  }

  private titlesToString(titles: any): any {
    return titles.reduce((previous, current) => {
      return `${ current.displayName } - ${ previous }`;
    }, '');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
