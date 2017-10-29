import { Component, Input, OnInit } from '@angular/core';
import { EditableTableService } from 'ng-editable-table/editable-table/editable-table.service';
import { Router } from '@angular/router';
import { DataService } from 'app/services/data.service';


@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  providers: [DataService]
})

export class DashboardListComponent implements OnInit {

  public id: any;
  public tableHeaders: any[];
  public tableRowsWithId: any[];
  public dataType: any[];
  public errors: any[] = [];

  constructor(
    private service: EditableTableService,
    private router: Router,
    private ds: DataService) {

    var user = JSON.parse(localStorage.getItem('mydb.user'));
    var role = JSON.parse(localStorage.getItem('mydb.role'));

    if (user && role != 1) {
      this.router.navigateByUrl('/logon');
      localStorage.clear();
    }

    this.id = localStorage.getItem('mydb.id');

    if (this.id) {
      localStorage.removeItem('mydb.id');
    }
    else {
      this.router.navigateByUrl('/control');
      alert("Realiza a pesquisa novamente");
    }

    this.tableRowsWithId = []; 
  }

  ngOnInit() {

    this.dataType = ['string', 'int', 'string', 'string'];
    this.tableHeaders = ['Ordenação', 'Relatório', 'Url'];

    if (this.id) {

      this.ds
        .getDashboardByClient(this.id)
        .subscribe(result => {

          if (result.data.dashboards.length > 0) {

            this.tableRowsWithId = new Array(result.data.dashboards.length)

            for (var i = 0; i < result.data.dashboards.length; i++) {

              this.tableRowsWithId[i] = new Array(4);
              this.tableRowsWithId[i][0] = result.data.dashboards[i].id;
              this.tableRowsWithId[i][1] = +result.data.dashboards[i].order;
              this.tableRowsWithId[i][2] = result.data.dashboards[i].title;
              this.tableRowsWithId[i][3] = result.data.dashboards[i].url;
            }
          }

          this.service.tableRowsObjects = [];
          this.service.tableHeadersObjects = [];

          this.service.createTableWithIds(this.tableHeaders, this.tableRowsWithId, this.dataType);
        });
    }
  
  }

  submit() {

    var dashboards = [];

    this.service.tableRowsObjects.forEach(row => {

      var rowId = row.id == undefined ? '0' : row.id.toString();

      dashboards.push({
        id: rowId,
        order: row.cells[0].content.toString(),
        title: row.cells[1].content,
        url: row.cells[2].content,
        customerId: this.id
      });

    });

    this.ds
      .createDashboards(dashboards)
      .subscribe(result => {
        alert('Mensagem sucesso');
      },
      error => {
        this.errors = JSON.parse(error._body).errors;
        console.log(this.errors);
      });
  }

  redirect(url) {
    window.open(url);
  };

  ellipsify(str) {
    return str.length > 20 ? (str.substring(0, 30) + '...') : str;
  };

}
