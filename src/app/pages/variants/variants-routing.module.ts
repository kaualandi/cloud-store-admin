import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariantsComponent } from './variants.component';

const routes: Routes = [{ path: '', component: VariantsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariantsRoutingModule { }
