import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';




@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent
    ],
    imports:[
        FormsModule,
        AngularFireAuthModule,
        CommonModule // Para poder usar los ngif y ngfor
    ]

})

export class AuthModule{}