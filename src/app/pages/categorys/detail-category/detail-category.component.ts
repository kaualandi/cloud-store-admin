import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/categorys';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss'],
})
export class DetailCategoryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICategory | undefined,
    private dialogRef: MatDialogRef<DetailCategoryComponent>,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    name: [this.data?.name || '', [Validators.required]],
  });

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    const data = this.form.value as ICategory;
    if (this.data?.id) data.id = this.data.id;

    this.dialogRef.close(data);
  }
}
