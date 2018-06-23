import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [DataService]
})
export class HomePageComponent implements OnInit {

  public dashboards: any[];
  public idDashboard: any;

  constructor(private router: Router, private ds: DataService){

    var user = JSON.parse(localStorage.getItem('mydb.user'));

    if (user == undefined || user.profile != 2) {

      this.router.navigateByUrl('/logon');
    }

    this.dashboards = [];

  }

  ngOnInit() {

    let user = JSON.parse(localStorage['mydb.user']);

    this.ds
      .getDashboardByUser(user.id)
      .subscribe(result => {

        if(result.data.dashboards.length > 0) {

          result.data.dashboards.forEach(dashboard => {

            this.dashboards.push({
              id: dashboard.id,
              name: dashboard.title,
              position: dashboard.order
            });

          });

          let dashboard = this.dashboards.find(db => db.position == 1);

          document.getElementById("pphName").innerHTML = dashboard.name;
          this.idDashboard = dashboard.id;
          this.dashboards.sort((a, b) => a.position - b.position);
        }
        else
        {
          document.getElementById("pphMsg").innerHTML = 'Nenhum dashaboard cadastrado';
        }

      });

  }

  valueChange(event: any) {

    let id = event.target.value;
    let dashboard = this.dashboards.find(p => p.id == id);
    document.getElementById("pphName").innerHTML = dashboard.name;

    this.idDashboard = id;
  }

}
