import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/components/modals/message/message.component';
import { IProduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import {
  CONFIG,
  DetailProductComponent,
} from './detail-product/detail-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
  ) {}

  loading = false;

  displayedColumns: string[] = [
    'image',
    'name',
    'base_price',
    'team',
    'variants',
    'created_at',
    'actions',
  ];

  dataSource: IProduct[] = [];
  page = 1;
  next = false;
  prev = false;
  total_page = 1;

  ngOnInit(): void {
    this.getProducts(1);
  }

  getProducts(page: number) {
    this.loading = true;
    this.productsService.getProducts(page).subscribe({
      next: (data) => {
        this.dataSource = data.results;
        this.page = page;
        this.next = !!data.next;
        this.prev = !!data.previous;
        this.total_page = Math.ceil(data.count / environment.page_size) || 1;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  detailProduct(data?: IProduct) {
    const dialogRef = this.dialog.open(DetailProductComponent, {
      ...CONFIG,
      data,
    });
    dialogRef.afterClosed().subscribe((result: IProduct | undefined) => {
      if (!result) return;
      if (result.id) {
        this.updateProduct(result);
        return;
      }
      this.createProduct(result);
    });
  }

  createProduct(data: IProduct) {
    this.loading = true;
    this.productsService.postProduct(data).subscribe({
      next: () => {
        this.getProducts(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  updateProduct(data: IProduct) {
    this.loading = true;
    this.productsService.patchProduct(data.id, data).subscribe({
      next: () => {
        this.getProducts(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  confirmDelete(data: IProduct) {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: { message: `Deseja realmente excluir ${data.name}?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.deleteProduct(data);
    });
  }

  deleteProduct(data: IProduct) {
    this.loading = true;
    this.productsService.deleteProduct(data.id).subscribe({
      next: () => {
        this.getProducts(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
