import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// Rotas
import { Routing, RoutingProviders} from './app.routing';

// Components
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeadbarComponent } from './components/shared/headbar/headbar.component';
import { SubMenuComponent } from './components/shared/sub-menu/sub-menu.component';
import { DashboardListComponent } from './components/shared/dashboard-list/dashboard-list.component';
import { MyDashboardComponent } from './components/shared/my-dashboard/my-dashboard.component';
import { DashboardSelectedComponent } from './components/shared/dashboard-selected/dashboard-selected.component';
import { ClientListComponent } from './components/shared/client-list/client-list.component';


// Extern components
import { EditableTableModule } from 'ng-editable-table/editable-table/editable-table.module';

//Pages
import { SignUpPageComponent } from './pages/signup/signup.component';
import { LoginPageComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home/home.component';
import { ControlComponent } from './pages/control/control.component';
import { ClientDashboardsComponent } from './pages/client-dashboards/client-dashboards.component';
import { RegisterComponent } from './pages/register/register.component';

// Services
import {AuthService } from './services/auth.service';

//Pipes
import { PowerBiPipe } from './pipes/powerbi.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    LoginPageComponent,
    HomePageComponent,
    FooterComponent,
    SubMenuComponent,
    DashboardListComponent,
    HeadbarComponent,
    MyDashboardComponent,
    PowerBiPipe,
    DashboardSelectedComponent,
    ControlComponent,
    ClientListComponent,
    ClientDashboardsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing,
    EditableTableModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
