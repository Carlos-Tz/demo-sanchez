import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewRegisterComponent } from './admin/new-register/new-register.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SecureInnerPagesGuard } from './services/secure-inner-pages.guard';
import { EditRegisterComponent } from './admin/edit-register/edit-register.component';
import { MainComponent } from './admin/main/main.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { NotasComponent } from './admin/notas/notas.component';
import { OrdenesComponent } from './admin/ordenes/ordenes.component';
import { NewOrdenComponent } from './admin/new-orden/new-orden.component';
import { NewNotaComponent } from './admin/new-nota/new-nota.component';
import { EditOrdenComponent } from './admin/edit-orden/edit-orden.component';
import { EditNotaComponent } from './admin/edit-nota/edit-nota.component';
import { InspeccionComponent } from './admin/inspeccion/inspeccion.component';
import { NewInspeccionComponent } from './admin/new-inspeccion/new-inspeccion.component';
import { EditInspeccionComponent } from './admin/edit-inspeccion/edit-inspeccion.component';
import { CarwashComponent } from './admin/carwash/carwash.component';
import { CarwasheComponent } from './admin/carwashe/carwashe.component';
import { Carwash1Component } from './admin/carwash1/carwash1.component';
import { Carwash2Component } from './admin/carwash2/carwash2.component';
import { Carwash3Component } from './admin/carwash3/carwash3.component';
import { ListTicketsComponent } from './admin/list-tickets/list-tickets.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: MainComponent},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'notas', component: NotasComponent, canActivate: [AuthGuard]},
  {path: 'ordenes', component: OrdenesComponent, canActivate: [AuthGuard]},
  {path: 'inspeccion', component: InspeccionComponent, canActivate: [AuthGuard]},
  {path: 'carwash', component: CarwashComponent, canActivate: [AuthGuard]},
  {path: 'list-carwash', component: ListTicketsComponent, canActivate: [AuthGuard]},
  {path: 'carwashe', component: CarwasheComponent, canActivate: [AuthGuard]},
  {path: 'carwash1', component: Carwash1Component, canActivate: [AuthGuard]},
  {path: 'carwash2', component: Carwash2Component, canActivate: [AuthGuard]},
  {path: 'carwash3', component: Carwash3Component, canActivate: [AuthGuard]},
  {path: 'nuevo-cliente', component: NewRegisterComponent, canActivate: [AuthGuard]},
  {path: 'nueva-orden', component: NewOrdenComponent, canActivate: [AuthGuard]},
  {path: 'nueva-nota', component: NewNotaComponent, canActivate: [AuthGuard]},
  {path: 'nueva-inspeccion', component: NewInspeccionComponent, canActivate: [AuthGuard]},
  {path: 'editar-cliente/:key', component: EditRegisterComponent, canActivate: [AuthGuard]},
  {path: 'editar-orden/:key', component: EditOrdenComponent, canActivate: [AuthGuard]},
  {path: 'editar-nota/:key', component: EditNotaComponent, canActivate: [AuthGuard]},
  {path: 'editar-inspeccion/:key', component: EditInspeccionComponent, canActivate: [AuthGuard]},
  /* {path: 'pdf/:key', component: PrintCasaComponent, canActivate: [AuthGuard]}, */
  {path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
 /*  {path: 'resetPass', component: ResetPassComponent, canActivate: [SecureInnerPagesGuard]} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
