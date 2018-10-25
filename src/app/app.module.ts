import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//Modules
import { AppRoutinModule } from './app-routing.module';



import { AppComponent } from './app.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DatalleComponent } from './ingreso-egreso/datalle/datalle.component';


//import { FooterComponent } from './shared/footer/footer.component';
//import { NavbarComponent } from './shared/navbar/navbar.component';
//import { SidebarComponent } from './shared/sidebar/sidebar.component';


import { ReactiveFormsModule} from '@angular/forms'

import  { AngularFireModule} from 'angularfire2'
import { AngularFirestoreModule} from 'angularfire2/firestore'
//import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment.prod';

//NGRX
import { StoreModule } from '@ngrx/store'
import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';




//MODULOS 
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegisterComponent,
    // IngresoEgresoComponent,
    // EstadisticaComponent,
    // DatalleComponent,
    // FooterComponent,
    // NavbarComponent,
    // SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutinModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AuthModule,
    RouterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
