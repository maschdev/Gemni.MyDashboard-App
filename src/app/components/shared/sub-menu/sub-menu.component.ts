import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html'
})
export class SubMenuComponent implements OnInit {

public user: string = '';
public role: string = '';

  constructor(private router: Router) { 
    
    var user = JSON.parse(localStorage.getItem('mydb.user'));

    if(user){
        this.user = user.name;
        this.role = JSON.parse(localStorage.getItem('mydb.role'));
    }

  }

  ngOnInit() {
  }

logout(){
  localStorage.clear();
  this.router.navigateByUrl('/logon');
}

}
