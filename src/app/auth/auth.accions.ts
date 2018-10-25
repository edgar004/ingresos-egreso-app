import {Action} from '@ngrx/store'
import { User } from './user.model';
 

export const SET_USER ='[Auth] Set User';
export const Uset_USER ='[Auth] Uset User';

export class SetUserAction implements Action{
    readonly type=SET_USER
    constructor(public user:User){}
}

export class UnsetUserAction implements Action{
    readonly type=Uset_USER
}


export type acciones=SetUserAction | UnsetUserAction