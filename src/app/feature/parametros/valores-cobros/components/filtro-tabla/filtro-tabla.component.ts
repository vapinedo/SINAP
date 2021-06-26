import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { SubSink } from 'subsink';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-tabla',
  templateUrl: './filtro-tabla.component.html',
  styleUrls: ['./filtro-tabla.component.scss']
})
export class FiltroTablaComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  @Output() onFilterChange = new EventEmitter;
  
  public municipioFilter = new FormControl('');
  public conceptoCobroFilter = new FormControl('');

  public filterValues = {
    municipio: '',
    conceptoCobro: ''
  }

  constructor() { } 

  ngOnInit(): void {
    this.fieldListener();
  }

  private fieldListener(): void {
    this.subs.add(
      this.municipioFilter.valueChanges
        .subscribe(query => {
          this.filterValues.municipio = query;
          this.onFilterChange.emit(this.filterValues);
        })
    );
    this.subs.add(
      this.conceptoCobroFilter.valueChanges
        .subscribe(query => {
          this.filterValues.conceptoCobro = query;
          this.onFilterChange.emit(this.filterValues);
        })
    );
  }

  clearFilter(): void {
    this.municipioFilter.setValue('');
    this.conceptoCobroFilter.setValue('');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
}