import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/components/modals/message/message.component';
import { DetailImageComponent } from 'src/app/components/shared/detail-image/detail-image.component';
import { IArticle } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  constructor(
    private articlesService: ArticlesService,
    private dialog: MatDialog
  ) {}

  loading = false;

  displayedColumns: string[] = ['image_lg', 'created_at', 'action'];
  dataSource: IArticle[] = [];
  page = 1;
  next = false;
  prev = false;
  total_page = 1;

  ngOnInit(): void {
    this.getArticles(1);
  }

  getArticles(page: number) {
    this.loading = true;
    this.articlesService.getArticles(page).subscribe({
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

  detailArticle() {
    const dialogRef = this.dialog.open(DetailImageComponent);
    dialogRef.afterClosed().subscribe((result: IArticle | undefined) => {
      if (!result) return;

      this.createArticle(result);
    });
  }

  createArticle(data: IArticle) {
    this.loading = true;
    this.articlesService.postArticle(data).subscribe({
      next: () => {
        this.getArticles(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  confirmDelete(data: IArticle) {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: { message: `Deseja realmente excluir esse artigo?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.deleteArticle(data);
    });
  }

  deleteArticle(data: IArticle) {
    this.loading = true;
    this.articlesService.deleteArticle(data.id).subscribe({
      next: () => {
        this.getArticles(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
