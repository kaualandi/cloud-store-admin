import { CategoryService } from './../../../services/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/categorys';
import { ISection } from 'src/app/models/section';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss'],
})
export class DetailCategoryComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICategory | undefined,
    private dialogRef: MatDialogRef<DetailCategoryComponent>,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    name: [this.data?.name || '', [Validators.required]],
    section_id: [this.data?.section_id || '', [Validators.required]],
  });

  sections: ISection[] = [];

  ngOnInit(): void {
    this.getSections();
  }

  getSections() {
    this.categoryService.getSectionsSelect().subscribe({
      next: (data) => {
        this.sections = data.results;
      },
    });
  }

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    const data = this.form.value as ICategory;
    if (this.data?.id) data.id = this.data.id;

    this.dialogRef.close(data);
  }
}
