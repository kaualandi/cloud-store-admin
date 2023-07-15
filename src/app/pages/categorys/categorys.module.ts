import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorysRoutingModule } from './categorys-routing.module';
import { CategorysComponent } from './categorys.component';


@NgModule({
  declarations: [
    CategorysComponent
  ],
  imports: [
    CommonModule,
    CategorysRoutingModule
  ]
})
export class CategorysModule { }
