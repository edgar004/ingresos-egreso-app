import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsGuard implements CanActivate {
  constructor( private router:Router,private auth:AuthService){

  }
  canActivate(){
    return this.auth.validarAuth();
  }
}