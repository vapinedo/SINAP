import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Injectable()
export class SpinnerService {

  constructor(private dialog: MatDialog) { }

  private dialogRef: MatDialogRef<LoaderComponent>;

  show(): void {
    this.dialogRef = this.dialog.open(LoaderComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
  }

  hide() {
    this.dialogRef.close();
  }

  

  
}
