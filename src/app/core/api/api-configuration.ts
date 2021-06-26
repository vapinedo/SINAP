/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'http://10.45.22.124:8081';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
