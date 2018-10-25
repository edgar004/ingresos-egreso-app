import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardsGuard } from './auth/auth-guards.guard';



const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register',component:RegisterComponent },
    {
        path:'',
        loadChildren:'./ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
        canLoad:[AuthGuardsGuard]
    },
//     { path: '',component:DashboardComponent,
//     children:DashboardRoutes,canActivate:[AuthGuardsGuard] 
//  },
    { path:'**',redirectTo:''}
]

@NgModule({
    
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]

})

export class AppRoutinModule {}
