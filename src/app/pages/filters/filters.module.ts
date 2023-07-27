import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './filters.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { DetailFilterComponent } from './detail-filter/detail-filter.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [FiltersComponent, DetailFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    FiltersRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
  ],
})
export class FiltersModule {}
