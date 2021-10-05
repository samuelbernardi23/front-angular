import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ClientesModule } from './pages/clientes/clientes.module';

const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then(m => m.PedidosModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pages/produtos/produtos.module').then(m => m.ProdutosModule),
    canActivate:[AuthGuardService]
  },
  // {
  //   path: 'produtos',
  //   component: ProdutosComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'pedidos',
  //   component: PedidosComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'login-form',
  //   component: LoginFormComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'reset-password',
  //   component: ResetPasswordFormComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'create-account',
  //   component: CreateAccountFormComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'change-password/:recoveryCode',
  //   component: ChangePasswordFormComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: '**',
  //   redirectTo: 'home'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuardService],
  exports: [RouterModule],
})
export class AppRoutingModule { }
