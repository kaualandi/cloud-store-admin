import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProduct | undefined,
    private dialogRef: MatDialogRef<DetailProductComponent>,
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({});

  handleImageSelect(image: string) {
    console.log('');
  }

  handleFormSubmit() {
    console.log('');
  }
}
