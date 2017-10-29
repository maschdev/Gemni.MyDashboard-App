import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';

@Component({
  selector: 'app-client-dashboards',
  templateUrl: './client-dashboards.component.html',
  providers: [Ui, DataService]
})
export class ClientDashboardsComponent implements OnInit {

  public id: any;
  private sub: any;

  public client: string;
  public document: string;
  public quantity: number;
  public email: string;

  constructor(private router: Router, private ui: Ui, private ds: DataService) {

    var user = JSON.parse(localStorage.getItem('mydb.user'));
    var role = JSON.parse(localStorage.getItem('mydb.role'));

    if (localStorage['mydb.user'] == undefined) {
      this.router.navigateByUrl('/logon');
    }

    if (role != 1) {
      this.router.navigateByUrl('/logon');
      localStorage.clear();
    }

    this.id = localStorage.getItem('mydb.id');
  }

  ngOnInit() {
    
    if (this.id) {
     
      this.ds
        .getUserDashboardInfo(this.id)
        .subscribe(result => {

          this.client = result.data.name;
          this.document = result.data.document;
          this.email = result.data.email;
          this.quantity = result.data.quantity;

        });
    }
  }

}
