import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITeam } from 'src/app/models/teams';

@Component({
  selector: 'app-detail-team',
  templateUrl: './detail-team.component.html',
  styleUrls: ['./detail-team.component.scss'],
})
export class DetailTeamComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ITeam | undefined,
    private dialogRef: MatDialogRef<DetailTeamComponent>,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    name: [this.data?.name || '', [Validators.required]],
    url: [this.data?.url || '', [Validators.required]],
  });

  handleImageSelect(image: string) {
    this.form.get('url')?.setValue(image);
  }

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    const data = this.form.value as ITeam;
    if (this.data?.id) data.id = this.data.id;

    this.dialogRef.close(data);
  }
}
