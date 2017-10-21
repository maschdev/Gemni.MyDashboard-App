import { Component, Input, OnInit } from '@angular/core';
import { EditableTableService } from 'ng-editable-table/editable-table/editable-table.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html'
})

export class DashboardListComponent implements OnInit {

  @Input() id: number;
  
  public tableHeaders: any[];
  public tableRowsWithId: any[];
  public dataType: any[];

  constructor(private service: EditableTableService ) { }

  ngOnInit() {

    alert("Pesquisar na base e trazer os relatórios do userID: "+ this.id);
    
    this.dataType = ['int','int', 'string', 'string'];
    var link = 'https://app.powerbi.com/view?r=eyJrIjoiNWYyMWExNTMtYWIwMy00MGVkLWI3OTItZTRiNTdmOTNkNWQ0IiwidCI6ImFjNTAxNjA3LWJmN2MtNDk2NC04MjY1LWMxMjZmNzg1ZmU4ZSJ9';
    this.tableHeaders = ['Ordenação', 'Relatório', 'Url'];

    this.tableRowsWithId = [
      [11, 1, 'Estoque', link ],
      [22, 2, 'Perdas', link ],
      [33, 3, 'Movimentação', link ]
    ];

    this.service.createTableWithIds(this.tableHeaders, this.tableRowsWithId, this.dataType);
  }

  submit(){
    var dashboards: Dashboard[] = [];

    this.service.tableRowsObjects.forEach(row => {
      dashboards.push(new Dashboard(
                        row.id == undefined ? 0 : row.id, 
                        row.cells[0].content, 
                        row.cells[1].content, 
                        row.cells[2].content));
    });
    
    alert("Chamar o serviço de Salvar Relatorios do usuario: IdUser e relatórios");
    

  }

  redirect(url) {
    window.open(url);
  };

  ellipsify (str) {
    return str.length > 20 ? (str.substring(0, 30) + '...') : str;
  };
  
}


class Dashboard {
  public id: number;
  public position: number;
  public name: string;
  public url: string;

  constructor(private theId: number, private thePosition: number, private theName: string, private theUrl: string) {
    this.id = this.theId;
    this.position = this.thePosition;
    this.name = this.theName;
    this.url = this.theUrl;
  }
};