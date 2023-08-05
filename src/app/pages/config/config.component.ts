import { ConfigService } from './../../services/config.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { IConfig } from 'src/app/models/config';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';

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
    private snackbar: SnackbarService,
    private configService: ConfigService,
    private cValidatons: CustomValidatorsService
  ) {}

  user = this.storage.myself;
  editUser = false;
  loadingUser = false;
  userBackup = {} as IUser;
  userForm = this.fb.group({
    profile_url: [''],
    name: [{ value: '', disabled: true }],
    email: [{ value: '', disabled: true }],
    phone: [{ value: '', disabled: true }],
  });

  config = {} as IConfig;
  editConfig = false;
  loadingConfig = false;
  configForm = this.fb.group({
    cnpj: [{ value: '', disabled: true }, [this.cValidatons.cnpj()]],
    customization_fee: [{ value: '', disabled: true }],
    delivery_fee: [{ value: '', disabled: true }],
    email: [{ value: '', disabled: true }, [Validators.email]],
    facebook: [{ value: '', disabled: true }],
    free_shipping: [{ value: false, disabled: true }],
    instagram: [{ value: '', disabled: true }],
    installment_limit: [{ value: '', disabled: true }],
    phone: [{ value: '', disabled: true }],
    tiktok: [{ value: '', disabled: true }],
    twitter: [{ value: '', disabled: true }],
    whatsapp: [{ value: '', disabled: true }],
  });

  ngOnInit(): void {
    this.userForm.patchValue({
      profile_url: this.user?.profile_url || '',
      name: this.user?.name || '',
      email: this.user?.email || '',
      phone: this.user?.phone || '',
    });
    this.userForm.disable();

    this.getConfig();
  }

  handleImageSelect(image: string) {
    this.userForm.patchValue({
      profile_url: image,
    });
  }

  cancelUserEdit() {
    this.editUser = false;
    this.userForm.patchValue(this.userBackup);
    this.userForm.disable();
  }

  handleEditUser() {
    if (!this.editUser) {
      this.userForm.enable();
      this.editUser = true;
      this.userBackup = { ...this.user };
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

  getConfig() {
    this.configService.getConfig().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  cancelConfigEdit() {
    this.editConfig = false;
    this.configForm.patchValue(this.config);
    this.configForm.disable();
  }

  handleEditConfig() {
    if (!this.editConfig) {
      this.configForm.enable();
      this.editConfig = true;
      return;
    }

    if (this.configForm.invalid) {
      this.configForm.markAllAsTouched();
      return;
    }

    this.loadingConfig = true;
    this.configForm.disable();

    this.configService
      .updateConfig(this.configForm.value as IConfig)
      .subscribe({
        next: (data) => {
          this.editConfig = false;
          this.config = data;
          this.loadingConfig = false;
          this.snackbar.success('Configurações atualizadas com sucesso!');
        },
        error: () => {
          this.loadingConfig = false;
        },
      });
  }
}
