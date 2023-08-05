import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-image',
  templateUrl: './detail-image.component.html',
  styleUrls: ['./detail-image.component.scss'],
})
export class DetailImageComponent {
  constructor(
    private dialogRef: MatDialogRef<DetailImageComponent>,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    image: ['', [Validators.required]],
  });

  handleImageSelect(image: string) {
    this.form.get('image')?.setValue(image);
  }

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    this.dialogRef.close(this.form.value);
  }
}
