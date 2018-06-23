import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { ControlComponent } from './pages/control/control.component';
import { ClientDashboardsComponent } from './pages/client-dashboards/client-dashboards.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordComponent } from './pages/password/password.component';
import { NullPageComponent } from './pages/null-page/null-page.component';


import {AuthService } from './services/auth.service';

const appRoutes: Routes = [
  { path: '', redirectTo: "/logon", pathMatch: 'full'},
  { path: 'logon',  component: LoginPageComponent },
  { path: 'home',  canActivate: [AuthService], component: HomePageComponent },
  { path: 'null',  component: NullPageComponent },
  { path: 'control', canActivate: [AuthService], component: ControlComponent },
  { path: 'clientdashboards', canActivate: [AuthService], component: ClientDashboardsComponent },
  { path: 'register', canActivate: [AuthService], component: RegisterComponent },
  { path: 'password',  component: PasswordComponent },
];

export const RoutingProviders: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

