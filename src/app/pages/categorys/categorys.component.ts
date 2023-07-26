import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/categorys';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { MessageComponent } from 'src/app/components/modals/message/message.component';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss'],
})
export class CategorysComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  loading = false;

  displayedColumns: string[] = ['name', 'created_at', 'actions'];
  dataSource: ICategory[] = [];
  page = 1;
  next = false;
  prev = false;
  total_page = 1;

  ngOnInit(): void {
    this.getCategorys(1);
  }

  getCategorys(page: number) {
    this.loading = true;
    this.categoryService.getCategorys(page).subscribe({
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

  detailCategory(data?: ICategory) {
    const dialogRef = this.dialog.open(DetailCategoryComponent, { data });
    dialogRef.afterClosed().subscribe((result: ICategory | undefined) => {
      if (!result) return;

      if (result.id) {
        this.updateCategory(result);
        return;
      }

      this.createCategory(result);
    });
  }

  createCategory(data: ICategory) {
    this.loading = true;
    this.categoryService.postCategory(data).subscribe({
      next: () => {
        this.getCategorys(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  updateCategory(data: ICategory) {
    this.loading = true;
    this.categoryService.patchCategory(data.id, data).subscribe({
      next: () => {
        this.getCategorys(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  confirmDelete(data: ICategory) {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: { message: `Deseja realmente excluir ${data.name}?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.deleteCategory(data);
    });
  }

  deleteCategory(data: ICategory) {
    this.loading = true;
    this.categoryService.deleteCategory(data.id).subscribe({
      next: () => {
        this.getCategorys(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
