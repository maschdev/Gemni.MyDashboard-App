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

    if (user) {
			console.log(user);
			if(ga){
				// Sends an event hit for the tracker named "myTracker" with the
				// following category, action, and label, and sets the nonInteraction
				// field value to true.
				console.log('sub-menu component - before analytics dispair');
				console.log('send', 'event', 'user', 'active', '{{user}}');
				ga('send', 'event', 'user', 'active', '{{user}}', {
					nonInteraction: true
				});
				console.log('sub-menu component - after analytics dispair');
      }

      this.user = user.name;
      this.role = JSON.parse(localStorage.getItem('mydb.role'));
    }

  }

  ngOnInit() { }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/logon');
  }
}
