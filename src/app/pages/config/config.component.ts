import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  user = this.storage.myself;
  editUser = false;
  loadingUser = false;
  userForm = this.fb.group({
    profile_url: [''],
    name: [{ value: '', disabled: true }],
    email: [{ value: '', disabled: true }],
    phone: [{ value: '', disabled: true }],
  });

  ngOnInit(): void {
    this.userForm.patchValue({
      profile_url: this.user?.profile_url || '',
      name: this.user?.name || '',
      email: this.user?.email || '',
      phone: this.user?.phone || '',
    });
    this.userForm.disable();
  }

  handleImageSelect(image: string) {
    this.userForm.patchValue({
      profile_url: image,
    });
  }

  handleEditUser() {
    if (!this.editUser) {
      this.userForm.enable();
      this.editUser = true;
      return;
    }

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loadingUser = true;
    this.userForm.disable();

    this.authService.updateMe(this.userForm.value as IUser).subscribe({
      next: (data) => {
        this.editUser = false;
        this.storage.myself = data;
        this.loadingUser = false;
        this.snackbar.success('Perfil atualizado com sucesso!');
        this.storage.changeUser();
      },
      error: () => {
        this.loadingUser = false;
        this.storage.changeUser();
      },
    });
  }
}
