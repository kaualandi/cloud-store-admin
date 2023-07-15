import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

const SPR = false;

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard], // * Caso o projeto tenha rotas sem auth além de login, remover essa linha.
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'teams',
        loadChildren: () =>
          import('./pages/teams/teams.module').then((m) => m.TeamsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'variants',
        loadChildren: () =>
          import('./pages/variants/variants.module').then(
            (m) => m.VariantsModule
          ),
      },
      {
        path: 'categorys',
        loadChildren: () =>
          import('./pages/categorys/categorys.module').then(
            (m) => m.CategorysModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: SPR ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
