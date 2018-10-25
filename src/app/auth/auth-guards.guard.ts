import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsGuard implements CanActivate,CanLoad {
  constructor( private router:Router,private auth:AuthService){

  }
  canActivate(){
    return this.auth.validarAuth();
  }

  canLoad(){
    return this.auth.validarAuth().pipe(
      take(1)
    )
  }
}