import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import {  map } from 'rxjs';
import { selectIsLogged } from '../../store/user/user.selectors';
Injectable({
    providedIn:'root'
})
export namespace AuthGuard {
    export const canActivate = (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ) => {
        const store = inject(Store);
        const router = inject(Router);
        return store.select(selectIsLogged).pipe(
            map((isAuth) => {
                return isAuth ? true : router.parseUrl("/auth/login");
              })
        );
    }
}