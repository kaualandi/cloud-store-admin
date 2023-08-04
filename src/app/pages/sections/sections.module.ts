import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsComponent } from './sections.component';
import { DetailSectionComponent } from './detail-section/detail-section.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SectionsComponent, DetailSectionComponent],
  imports: [
    CommonModule,
    SectionsRoutingModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class SectionsModule {}
