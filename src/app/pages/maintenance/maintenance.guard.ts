import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class MaintenanceGuard implements CanActivate {

    constructor(private firebase: AngularFireDatabase, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // We want to block the route if the maintenance mode is on, meaning that we want to allow it if it's not.
        return this.firebase.object('maintenance')
            .valueChanges()
            .map(maintenance => !maintenance)
            .do(maintenance => {
                if (maintenance) {
                    this.router.navigate(['maintenance']);
                }
            });
    }
}
