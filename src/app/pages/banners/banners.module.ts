import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { BannersComponent } from './banners.component';


@NgModule({
  declarations: [
    BannersComponent
  ],
  imports: [
    CommonModule,
    BannersRoutingModule
  ]
})
export class BannersModule { }
