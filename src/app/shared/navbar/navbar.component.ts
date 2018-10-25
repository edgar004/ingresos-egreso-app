import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  nombre:string
  subscription:Subscription=new Subscription()
    constructor(private store:Store<AppState>) { }
  
    ngOnInit() {
      this.subscription=this.store.select('auth').pipe(
        filter( (datos:any) =>{ 
          if(datos.user!=null){
            return datos
          }
        })
      )
    
      .subscribe(res=>{
        this.nombre=res.user.nombre
     
      })
    }
  
    ngOnDestroy(){
      this.subscription.unsubscribe()
    }
}
