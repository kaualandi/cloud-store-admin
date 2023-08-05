import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  constructor(private storage: StorageService, private fb: FormBuilder) {}

  user = this.storage.myself;

  editUser = false;
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
    console.log(this.userForm.disabled);
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
    }
  }
}
