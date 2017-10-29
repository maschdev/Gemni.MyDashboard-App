import { Component, OnInit, Input } from '@angular/core';
import { PowerBiPipe } from '../../../pipes/powerbi.pipe';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-dashboard-selected',
  templateUrl: './dashboard-selected.component.html',
  providers: [PowerBiPipe, DataService]
})
export class DashboardSelectedComponent implements OnInit {

  //@Input() selectedId: any;

  private _selectedId: any;

  @Input('selectedId')

  get selectedId(): any {
    return this._selectedId;
  }

  set selectedId(value: any) {
    this._selectedId = value;
    this.getDashboard(value);
  }

  public url: SafeResourceUrl;

  constructor(private powerbi: PowerBiPipe, private ds: DataService) {  }

  ngOnInit() { }

  getDashboard(id) {
    if(id){
    this.ds
      .getDashboard(id)
      .subscribe(result => {

        var link = result.data.url;
        this.url = this.powerbi.transform(link);

      });
    }
    // var link = 'https://app.powerbi.com/view?r=eyJrIjoiZDM1MWY3ZGYtMzhmYi00Y2NjLWFiZWQtMWI5NjYyYTdmNzdhIiwidCI6ImFjNTAxNjA3LWJmN2MtNDk2NC04MjY1LWMxMjZmNzg1ZmU4ZSJ9';
    // this.url = this.powerbi.transform(link);

  }

}
