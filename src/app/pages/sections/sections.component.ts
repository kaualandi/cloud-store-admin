import { MatDialog } from '@angular/material/dialog';
import { SectionsService } from './../../services/sections.service';
import { Component, OnInit } from '@angular/core';
import { ISection } from 'src/app/models/section';
import { environment } from 'src/environments/environment';
import { MessageComponent } from 'src/app/components/modals/message/message.component';
import { DetailSectionComponent } from './detail-section/detail-section.component';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  constructor(
    private sectionsService: SectionsService,
    private dialog: MatDialog
  ) {}

  loading = false;

  displayedColumns: string[] = ['name', 'categorys', 'created_at', 'actions'];

  dataSource: ISection[] = [];
  page = 1;
  next = false;
  prev = false;
  total_page = 1;

  ngOnInit(): void {
    this.getSections(1);
  }

  getSections(page: number) {
    this.loading = true;
    this.sectionsService.getSections(page).subscribe({
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

  detailSection(data?: ISection) {
    const dialogRef = this.dialog.open(DetailSectionComponent, { data });
    dialogRef.afterClosed().subscribe((result: ISection | undefined) => {
      if (!result) return;

      if (result.id) {
        this.updateSection(result);
        return;
      }

      this.createSection(result);
    });
  }

  createSection(data: ISection) {
    this.loading = true;
    this.sectionsService.postSection(data).subscribe({
      next: () => {
        this.getSections(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  updateSection(data: ISection) {
    this.loading = true;
    this.sectionsService.patchSection(data.id, data).subscribe({
      next: () => {
        this.getSections(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  confirmDelete(data: ISection) {
    const dialogRef = this.dialog.open(MessageComponent, {
      data: { message: `Deseja realmente excluir ${data.name}?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.deleteSection(data);
    });
  }

  deleteSection(data: ISection) {
    this.loading = true;
    this.sectionsService.deleteSection(data.id).subscribe({
      next: () => {
        this.getSections(this.page);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
