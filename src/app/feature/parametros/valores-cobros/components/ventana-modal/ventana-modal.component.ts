import { Component, 
  ComponentFactoryResolver, ComponentRef, 
  Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.scss']
})
export class VentanaModalComponent implements OnInit, OnDestroy {

  public modalTitle: string;
  public componentRef: ComponentRef<any>;
  @ViewChild('target', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    public dialogRef: MatDialogRef<VentanaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.container.clear(); 
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.dataFromModalWindow = this.data.dataComponent;

    this.modalTitle = this.data.dataComponent.title;
  }

  close(): void {
    if (typeof this.componentRef.instance.cancel === "function") {
      this.componentRef.instance?.cancel();
    } else {
      this.dialogRef.close();
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  } 

}