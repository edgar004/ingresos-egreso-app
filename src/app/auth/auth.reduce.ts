import * as fromAuth from './auth.accions'
import { User } from './user.model';


export interface AuthState {
    user:User;
}


const estadoInicial:AuthState={
    user:null
}


export function authReducer(state=estadoInicial,action:fromAuth.acciones):AuthState{
        switch(action.type){
            case  fromAuth.SET_USER:
                return {
                    user:{...action.user}
                }

                case fromAuth.Uset_USER:
                return {
                    user:null
                }

            default:
            return state
        }
}