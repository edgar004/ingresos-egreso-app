import * as fromUi from './shared/ui.reducer'
import * as fromAuth from './auth/auth.reduce'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    ui:fromUi.State,
    auth:fromAuth.AuthState
}


export const appReducers:ActionReducerMap<AppState>={
    ui:fromUi.uiReducer,
    auth:fromAuth.authReducer
}