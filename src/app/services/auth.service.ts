import{ Injectable } from '@angular/core';
import{ Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate{
    constructor(private router: Router){
    }

canActivate(){

    if(!localStorage.getItem('mydb.token')){
        this.router.navigate(['/logon']);
        return false;
    }  

    return true;
}

}