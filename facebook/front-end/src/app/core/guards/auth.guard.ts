import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { selectIsAuth } from 'src/app/store/user/user.selectors';
import { catchError, map, of } from 'rxjs';
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
        console.log("Consultadno los guarfds")
        return store.select(selectIsAuth).pipe(
            map((isAuth) => {
                return isAuth ? true : router.parseUrl("/auth/login");
              })
        );
    }

    export const canActivateChild = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) =>{ 
        console.log("Activeitd from children");
        return canActivate(route, state)
    };
}