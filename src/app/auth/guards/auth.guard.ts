import { 
  ActivatedRouteSnapshot, 
  CanActivateFn, 
  CanMatchFn, 
  Route, 
  Router, 
  RouterStateSnapshot, 
  UrlSegment 
} from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";



export const canActivateAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });
 
  return checkAuthStatus();
};
 
export const canMatchAuthGuard: CanMatchFn = ( //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });
 
  return checkAuthStatus();
};

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
 
  return authService.checkAuthentication()
    .pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigateByUrl('/auth/login');
        }
      })
    );
};