import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { BannersRoutingModule } from './banners-routing.module';
import { BannersComponent } from './banners.component';

@NgModule({
  declarations: [BannersComponent],
  imports: [
    CommonModule,
    BannersRoutingModule,
    SharedModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
  ],
})
export class BannersModule {}
