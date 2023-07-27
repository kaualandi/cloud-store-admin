import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/components/modals/message/message.component';
import { FilterService } from 'src/app/services/filter.service';
import { environment } from 'src/environments/environment';
import { DetailFilterComponent } from './detail-filter/detail-filter.component';
import { IFilter } from 'src/app/models/filters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  constructor(
    private filterService: FilterService,
    private dialog: MatDialog
  ) {}

  loading = false;

  displayedColumns: string[] = ['name', 'category', 'created_at', 'actions'];
  dataSource: IFilter[] = [];
  page = 1;
  next = false;
  prev = false;
  total_page = 1;

  ngOnInit(): void {
    this.getFilters(1);
  }

  getFilters(page: number) {
    this.loading = true;
    this.filterService.getFilters(page).subscribe({
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

  detailFilter(data?: IFilter) {
    const dialogRef = this.dialog.open(DetailFilterComponent, { data });
    dialogRef.afterClosed().subscribe((result: IFilter | undefined) => {
      if (!result) return;

      if (result.id) {
        this.updateFilter(result);
        return;
      }

      this.createFilter(result);
    });
  }

  createFilter(data: IFilter) {
    this.loading = true;
    this.filterService.postFilter(data).subscribe({
      next: () => {
        this.getFilters(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  updateFilter(data: IFilter) {
    this.loading = true;
    this.filterService.patchFilter(data.id, data).subscribe({
      next: () => {
        this.getFilters(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  confirmDelete(data: IFilter) {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: { message: `Deseja realmente excluir ${data.name}?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.deleteFilter(data);
    });
  }

  deleteFilter(data: IFilter) {
    this.loading = true;
    this.filterService.deleteFilter(data.id).subscribe({
      next: () => {
        this.getFilters(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
