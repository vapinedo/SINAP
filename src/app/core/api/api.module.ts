/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { CreditosBCOService } from './services/creditos-bco.service';
import { GeneracionTasasService } from './services/generacion-tasas.service';
import { AsignaVarConceptoService } from './services/asigna-var-concepto.service';
import { CalendarioPagoService } from './services/calendario-pago.service';
import { ConceptoService } from './services/concepto.service';
import { DetalleTramiteService } from './services/detalle-tramite.service';
import { DiaAdicionalService } from './services/dia-adicional.service';
import { DiasHabilesService } from './services/dias-habiles.service';
import { DomainService } from './services/domain.service';
import { BasicErrorControllerService } from './services/basic-error-controller.service';
import { EstadoCuentaCorrienteService } from './services/estado-cuenta-corriente.service';
import { LocationService } from './services/location.service';
import { MultasService } from './services/multas.service';
import { NormativaService } from './services/normativa.service';
import { OperacionVehiculoService } from './services/operacion-vehiculo.service';
import { ParFeriadoService } from './services/par-feriado.service';
import { ParParametroService } from './services/par-parametro.service';
import { PlateClassService } from './services/plate-class.service';
import { PrescriptionService } from './services/prescription.service';
import { PropVehiculosService } from './services/prop-vehiculos.service';
import { SalarioMinimoService } from './services/salario-minimo.service';
import { SeguridadControllerService } from './services/seguridad-controller.service';
import { TarifaRegistralService } from './services/tarifa-registral.service';
import { TarifasService } from './services/tarifas.service';
import { TarifasMunicipiosService } from './services/tarifas-municipios.service';
import { TransaccionesService } from './services/transacciones.service';
import { VariablesRecaudoService } from './services/variables-recaudo.service';
import { VehicleTypeService } from './services/vehicle-type.service';
import { VehiculosExentosService } from './services/vehiculos-exentos.service';
import { VigenciasService } from './services/vigencias.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    CreditosBCOService,
    GeneracionTasasService,
    AsignaVarConceptoService,
    CalendarioPagoService,
    ConceptoService,
    DetalleTramiteService,
    DiaAdicionalService,
    DiasHabilesService,
    DomainService,
    BasicErrorControllerService,
    EstadoCuentaCorrienteService,
    LocationService,
    MultasService,
    NormativaService,
    OperacionVehiculoService,
    ParFeriadoService,
    ParParametroService,
    PlateClassService,
    PrescriptionService,
    PropVehiculosService,
    SalarioMinimoService,
    SeguridadControllerService,
    TarifaRegistralService,
    TarifasService,
    TarifasMunicipiosService,
    TransaccionesService,
    VariablesRecaudoService,
    VehicleTypeService,
    VehiculosExentosService,
    VigenciasService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
