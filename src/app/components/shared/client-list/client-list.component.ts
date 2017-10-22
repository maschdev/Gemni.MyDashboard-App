import { Component, OnInit, Input } from '@angular/core';

import { Ui } from 'app/utils/ui';
import { DataService } from 'app/services/data.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  providers: [Ui, DataService]
})
export class ClientListComponent implements OnInit {

  public clientlist: any[];
  public clientlistbase: any[];
  public id: number;
  public name: string;
  public showList: boolean;

  @Input() clients: any[];

  constructor(private ui: Ui, private router: Router, private ds: DataService) {


   
    
    var user = JSON.parse(localStorage.getItem('mydb.user'));
    var role = JSON.parse(localStorage.getItem('mydb.role'));

    if(localStorage['mydb.user'] == undefined ){
      this.router.navigateByUrl('/logon');
    }
        if(role != 1){
          this.router.navigateByUrl('/logon');
          localStorage.clear();
        }

   }

  ngOnInit() {
    this.clientlist = this.clients;
  }

  reports(id) {
    localStorage.setItem('mydb.id', id);
    //this.router.navigate(['/clientdashboards', id]);
    this.router.navigateByUrl('/clientdashboards');
    
  }

  edit(id) {

    localStorage.setItem('mydb.id', id);
    //this.router.navigate(['/register', id]);
    this.router.navigateByUrl('/register');
    
  }

  showModal(element) {
    
    this.id = element.Id;
    this.name = element.Name;
    this.ui.setActive('modal');

  }

  closeModal() {
    this.ui.setInactive('modal');
  }

  delete(id) {
    
    alert("Excluir o registro na base: " + id);

    var index = this.clientlist.findIndex(client => client.Id == id);
    this.clientlist.splice(index, 1);
    this.ui.setInactive('modal');

  }

}
