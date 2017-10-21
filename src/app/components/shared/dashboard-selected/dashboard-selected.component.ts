import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PowerBiPipe } from '../../../pipes/powerbi.pipe';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-selected',
  templateUrl: './dashboard-selected.component.html',
  providers: [PowerBiPipe]
})
export class DashboardSelectedComponent implements OnInit {

  @Input() selectedId: number;

  // @Input() set selectedId(id: number) {
  //   this.currentSelectedItem = id;
  //   this.selectedItemChange.emit(id); 
  // }

  // @Output() selectedItemChange: EventEmitter<number> = new EventEmitter<number>();
  
  // get selectedItem(): number {
  //   return this.currentSelectedItem; 
  // }

  // private currentSelectedItem: number;
  public url: SafeResourceUrl;

  constructor(private powerbi: PowerBiPipe) {
   }

  ngOnInit() {

    

    var link = 'https://app.powerbi.com/view?r=eyJrIjoiZDM1MWY3ZGYtMzhmYi00Y2NjLWFiZWQtMWI5NjYyYTdmNzdhIiwidCI6ImFjNTAxNjA3LWJmN2MtNDk2NC04MjY1LWMxMjZmNzg1ZmU4ZSJ9';
    this.url = this.powerbi.transform(link);
      
  }

}
