import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/categorys';
import { IFilter } from 'src/app/models/filters';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-detail-filter',
  templateUrl: './detail-filter.component.html',
  styleUrls: ['./detail-filter.component.scss'],
})
export class DetailFilterComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IFilter | undefined,
    private dialogRef: MatDialogRef<DetailFilterComponent>,
    private fb: FormBuilder,
    private filterService: FilterService
  ) {}

  form = this.fb.group({
    name: [this.data?.name || '', [Validators.required]],
    category_id: [this.data?.category.id || 0, [Validators.required]],
  });

  categorys: ICategory[] = [];

  ngOnInit(): void {
    this.filterService.getCategorysSelect().subscribe({
      next: (data) => {
        this.categorys = data.results;
      },
    });
  }

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    const data = this.form.value as IFilter;
    if (this.data?.id) data.id = this.data.id;

    this.dialogRef.close(data);
  }
}
