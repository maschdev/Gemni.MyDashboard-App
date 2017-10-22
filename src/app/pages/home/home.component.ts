import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomePageComponent implements OnInit {

public dashboards: any[];
public idDashboard: number;

private sub: any;
public id: any;

  constructor( private router: Router) {

        if(localStorage['mydb.user'] == undefined ){
          this.router.navigateByUrl('/logon');
        }

   }

  ngOnInit() {
    
    
    // this.sub = this.route.params.subscribe(params => {
    //         // recupero o Id no parametro e pesquiso os dashboards do cliente
    //         this.id = + params['id'];

    //       });

           alert(JSON.parse(localStorage.getItem('mydb.user')).id);

     this.dashboards = [
         new Dashboard(1, 'Movimentação', 1),
         new Dashboard(2, 'Estoque', 3),
         new Dashboard(3, 'Perda', 2)
     ];

    var dashboard = this.dashboards.find(db => db.position == 1);

    document.getElementById("pphName").innerHTML = dashboard.name;
    this.idDashboard = dashboard.id;


    this.dashboards.sort((a, b) => a.position - b.position);
  }

  valueChange(event: any){
    
    var id = event.target.value;
    var dashboard = this.dashboards.find(p => p.id == id);
    document.getElementById("pphName").innerHTML = dashboard.name;

    this.idDashboard = id;
  }

}

 class Dashboard {
  public id: number;
  public name: string;
  public position: number;

  constructor(private theId: number, private theName: string, private thePosition: number) {
    this.id = this.theId;
    this.name = this.theName;
    this.position = this.thePosition;
  }
};
