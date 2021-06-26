import { Component } from '@angular/core';
import { LocaleService } from '@core/services/locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Registro Vehicular';

  constructor(public localeService: LocaleService) {  }
}
