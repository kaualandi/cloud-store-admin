import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/components/modals/message/message.component';
import { DetailImageComponent } from 'src/app/components/shared/detail-image/detail-image.component';
import { IBanner } from 'src/app/models/banner';
import { BannersService } from 'src/app/services/banners.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {
  constructor(
    private bannersService: BannersService,
    private dialog: MatDialog
  ) {}

  loading = false;

  displayedColumns: string[] = ['image_lg', 'created_at', 'action'];
  dataSource: IBanner[] = [];
  page = 1;
  next = false;
  prev = false;
  total_page = 1;

  ngOnInit(): void {
    this.getBanners(1);
  }

  getBanners(page: number) {
    this.loading = true;
    this.bannersService.getBanners(page).subscribe({
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

  detailBanner() {
    const dialogRef = this.dialog.open(DetailImageComponent);
    dialogRef.afterClosed().subscribe((result: IBanner | undefined) => {
      if (!result) return;

      this.createBanner(result);
    });
  }

  createBanner(data: IBanner) {
    this.loading = true;
    this.bannersService.postBanner(data).subscribe({
      next: () => {
        this.getBanners(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  confirmDelete(data: IBanner) {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: { message: `Deseja realmente excluir esse banner?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.deleteBanner(data);
    });
  }

  deleteBanner(data: IBanner) {
    this.loading = true;
    this.bannersService.deleteBanner(data.id).subscribe({
      next: () => {
        this.getBanners(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
