import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { CategorysRoutingModule } from './categorys-routing.module';
import { CategorysComponent } from './categorys.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CategorysComponent, DetailCategoryComponent],
  imports: [
    CommonModule,
    CategorysRoutingModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class CategorysModule {}
