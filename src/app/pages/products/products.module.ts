import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragInDropDirective } from 'src/app/directives/drag-in-drop.directive';

@NgModule({
  declarations: [
    ProductsComponent,
    DetailProductComponent,
    DragInDropDirective,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
  ],
})
export class ProductsModule {}
