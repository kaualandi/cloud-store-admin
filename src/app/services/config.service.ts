import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { IConfig } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpService) {}

  getConfig() {
    return this.http.get<IConfig>('config');
  }

  updateConfig(data: IConfig) {
    const body = new HttpParams()
      .set('cnpj', data.cnpj)
      .set('customization_fee', data.customization_fee)
      .set('delivery_fee', data.delivery_fee)
      .set('email', data.email)
      .set('facebook', data.facebook)
      .set('free_shipping', data.free_shipping)
      .set('instagram', data.instagram)
      .set('installment_limit', data.installment_limit)
      .set('phone', data.phone)
      .set('tiktok', data.tiktok)
      .set('twitter', data.twitter)
      .set('whatsapp', data.whatsapp);

    return this.http.patch<IConfig>('config', body);
  }
}
