import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { AuthGuardService } from '../../shared/services/auth.service';

const routes: Routes = [
   {
      path: '',
      component: ClientesComponent,
      canActivate: [AuthGuardService]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ClientesRountingModule { }
