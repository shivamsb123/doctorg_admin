import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import {SuperAdminService} from '../service/super-admin.service'


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router , public superAdminService:SuperAdminService) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
            // console.log(localStorage.getItem('token'))
        var isAuthenticated = localStorage.getItem('token') ? true : false;
        if(isAuthenticated){
			let routePermission = next.data.roles;
			let userPermission:any = this.superAdminService.getAuthUser();
            // console.log(userPermission)
			userPermission = userPermission ? userPermission.roleId : '';
			if (userPermission){
                // console.log(routePermission)
				if (routePermission.indexOf(userPermission) > -1)
					return true;
				else {
					let navigateUrl = userPermission === 3 ? '/doctor-dashboard' : (userPermission === 1 ? '/dashboard' : userPermission === 2 ? '/clinic-dashboard' : '');
					this.router.navigate([navigateUrl]);
				}
			}else {
				localStorage.removeToken('token');
				this.router.navigate(['']);
			}
        }
        if (!isAuthenticated) {
            this.router.navigate(['']);
        }
        return isAuthenticated;
    }
}