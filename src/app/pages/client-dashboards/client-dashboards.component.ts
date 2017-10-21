import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';

@Component({
  selector: 'app-client-dashboards',
  templateUrl: './client-dashboards.component.html',
  providers: [Ui, DataService]
})
export class ClientDashboardsComponent implements OnInit, OnDestroy {

  public id: any;
  private sub: any;

  public client: string;
  public document: string;
  public quantity: number;
  public email: string;

  constructor(private route: ActivatedRoute, private ui: Ui,  ds: DataService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      // recupero o Id no parametro e pesquiso os dashboards do cliente
      this.id = +params['id'];

      //alert('pesquisar o client e retornar os dados');

      this.client = 'Caio';
      this.document = '391.533.788-90';
      this.email = 'caio@caio.com';
      this.quantity = 7;

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
