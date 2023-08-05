import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { IFilter } from 'src/app/models/filters';
import { IProduct, IProductVariant } from 'src/app/models/product';
import { ITeam } from 'src/app/models/teams';
import { ProductsService } from 'src/app/services/products.service';

export const CONFIG = {
  width: '100%',
  maxWidth: '512px',
  disableClose: true,
};

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProduct | undefined,
    private dialogRef: MatDialogRef<DetailProductComponent>,
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  separatorKeysCodes: number[] = [ENTER, COMMA];

  teams: ITeam[] = [];
  filters: IFilter[] = [];

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    base_price: ['', [Validators.required]],
    trending: [false],
    discount: [''],
    team_id: ['', [Validators.required]],
    filter: [''],
    variant: [''],
  });

  images: string[] = [];
  selected_filters: IFilter[] = [];
  variants: IProductVariant[] = [];

  ngOnInit(): void {
    this.getTeams();
    this.getFilters('');

    this.watchFields();

    if (!this.data?.id) {
      this.variants.push(
        ...([
          { id: 0, name: 'P', is_active: true },
          { id: 0, name: 'M', is_active: true },
          { id: 0, name: 'G', is_active: true },
          { id: 0, name: 'GG', is_active: true },
          { id: 0, name: '3XG', is_active: true },
        ] as IProductVariant[])
      );
    }
  }

  handleImageSelect(image: string) {
    this.images.push(image);
  }

  handleImageDrop(files: FileList) {
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file?.type.includes('image')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.handleImageSelect(reader.result as string);
        };
      }
    }
  }

  handleRemoveImage(index: number) {
    this.images.splice(index, 1);
  }

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const product = {
      ...this.data,
      ...this.form.value,
      images: this.images.map((image) => ({ id: 0, url: image })),
      filters: this.selected_filters,
      variants: this.variants,
    } as IProduct;

    this.dialogRef.close(product);
  }

  getTeams() {
    this.productsService.getTeamsSelect().subscribe({
      next: (data) => {
        this.teams = data.results;
      },
    });
  }

  getFilters(name: string) {
    this.productsService.getFiltersAuto(name).subscribe({
      next: (data) => {
        this.filters = data.results;
      },
    });
  }

  removeSelectedFilter(filterId: number) {
    this.selected_filters = this.selected_filters.filter(
      (filter) => filter.id !== filterId
    );
  }

  selectFilter(event: MatAutocompleteSelectedEvent) {
    const filter = event.option.value as IFilter;
    this.selected_filters.push(filter);
    this.form.patchValue({
      filter: '',
    });
  }

  addVariant(event: MatChipInputEvent) {
    if (!event.value) return;
    this.variants.push({
      id: 0,
      product_id: 0,
      name: event.value,
      is_active: true,
      created_at: '',
      updated_at: '',
    });

    this.form.patchValue({
      variant: '',
    });
  }

  removeSelectedVariant(index: number) {
    this.variants.splice(index, 1);
  }

  watchFields() {
    this.form
      .get('filter')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        if (typeof data === 'object') {
          this.getFilters('');
          return;
        }
        this.getFilters(data);
      });
  }
}
