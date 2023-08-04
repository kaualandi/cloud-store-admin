import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISection } from 'src/app/models/section';

@Component({
  selector: 'app-detail-section',
  templateUrl: './detail-section.component.html',
  styleUrls: ['./detail-section.component.scss'],
})
export class DetailSectionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ISection | undefined,
    private dialogRef: MatDialogRef<DetailSectionComponent>,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    name: [this.data?.name || '', [Validators.required]],
  });

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    const data = this.form.value as ISection;
    if (this.data?.id) data.id = this.data.id;

    this.dialogRef.close(data);
  }
}
